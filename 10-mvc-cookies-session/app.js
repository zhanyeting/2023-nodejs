var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');

// 引入 session 模块
const session = require('express-session');
const MongoStore = require("connect-mongo");
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 注册 session 中间件
app.use(session({
  name: 'nodeProjectSession',
  secret: 'this is a secret', // 服务器生成 session 的签名
  cookie: {
    maxAge: 1000 * 60 * 10,  // 过期时间
    // secure: false,  // 为 true 时候表示只有 https 协议才能访问cookie
  },
  resave: true,    // 重新session后，会自动设置过期时间
  // saveUninitialized: true, //强制将为初始化的 session 存储
  // rolling: true, //为 true 表示 超时前刷新，cookie 会重新计时； 为 false 表示在超时前刷新多少次，都是按照第一次刷新开始计时。

  store: MongoStore.create({
    mongoUrl: 'mongodb://127.0.0.1:27017/node_session',
    ttl: 1000 * 60 * 10, // 过期时间, 必须与上面的时间保持一致
  }),
}));

// 设置中间件，sesssion过期校验
app.use((req, res, next) => {
  // 排除login相关的路由和接口
  if (req?.url?.includes('login')) {
    next();
    return;
  }
  if (req?.session?.user) {
    next();
  } else {
    //是接口 , 返回 错误码
    //不是接口，就重定向
    req?.url?.includes('api') 
    ? res.status(401).send({ok: 0})
    : res.redirect('/login');
  }
});

app.use('/', indexRouter);
app.use('/api', usersRouter);
app.use('/login', loginRouter);

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
