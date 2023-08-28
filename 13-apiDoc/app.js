var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var uploadRouter = require('./routes/upload');
const JWT = require('./util');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// 设置中间件，token 过期校验
app.use((req, res, next) => {
  // 排除login相关的路由和接口
  if (req?.url?.includes('login')) {
    next();
    return;
  }

  // 前端设置的 token 加上了 Bearer ， 所以需要split一下
  // Bearer eyJhbGciOiJ.IUzI1NiIs.IM__AaLuOL5DeUIMdlQC4
  // const token = req?.headers?.authorization?.split(' ')[1];
  const token = req?.headers?.authorization;

  // 判断 token 是否存在
  if (token) {
    const checkedToken = JWT.verify(token);
    // 校验token
    if (checkedToken){
      // 需要重新生成 token
      const newToken = JWT.generate({
        data: checkedToken?.data
      }, '1d');
      res.header('authorization', newToken)
      next();
    } else {
      // token 过期了，跳转到 login 页面
      res.status(401).send({
        ok: 0,
        errCode: -1,
        errInfo: 'token expired',
      })
    }
  } else {
    next();
  }
});

app.use('/', indexRouter);
app.use('/api', usersRouter);
app.use('/login', loginRouter);
app.use('/upload', uploadRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
