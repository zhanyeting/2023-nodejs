var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var loginRouter = require('./routes/login');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var chatRouter = require('./routes/chat');
const JWT = require('./util/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// token 拦截校验
app.use( (req, res, next) => {
  // 排除 login 相关的页面和接口
  if (req?.url?.includes('login')) {
    next();
    return;
  }

  const token = req?.headers?.authorization;  // null
  if (token) {
    const payload = JWT.verify(token);
    console.log(1111, payload);
    if (payload) {
      // 需要重新生成 token
      const newToken = JWT.generate({
        data: payload?.data
      });
      res.header('authorization', newToken);
      next();
    } else {
      // token 过期，跳转到登录页面
      res.status(401).send({ok: 0})
    }
  } else {
    next();
  }
})

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/api', usersRouter);
app.use('/chat', chatRouter);

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
