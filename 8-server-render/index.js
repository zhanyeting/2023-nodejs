const path = require('path');
const express = require('express');
const app = express();

const HomeRouter = require('./route/HomeRoute');
const LoginRouter = require('./route/LoginRoute');

// //配置模板引擎  ejs
// app.set('views', './views');
// app.set('view engine', 'ejs');

// //支持直接渲染html文件
app.set('views', './views2');
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile); // 配置用 ejs 的方式渲染模版


// 处理静态资源
app.use("/static",express.static("static"));
// app.use(express.static("public"));
app.use(express.static(path.join(__dirname, 'public')));

// 配置解析 get 请求和 post 请求 参数的中间件
app.use(express.urlencoded({extended: false}));  // get 请求
app.use(express.json());   // post 请求


// 验证token
app.use((req, res, next) => {
    console.log("验证token。。。。");
    next();
});


app.use("/home", HomeRouter);
app.use("/login", LoginRouter);

// 应用级中间件-错误处理
app.use((req, res, next) => {
    res.sendStatus(404);
    // res.status(404).send("丢了")
});

// 启动服务
app.listen(3000, () => {
    console.log("server start ...... ");
});