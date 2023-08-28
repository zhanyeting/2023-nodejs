const express = require('express');
const app = express();

const HomeRouter = require('./router/homeRouter');
const LoginRouter = require('./router/loginRouter');

// 应用级中间件， 配置静态资源
app.use(express.static('public'));
app.use(express.static('static'));
// app.use("/static",express.static("static"))

// 应用级中间件，配置解析post参数的-不用下载第三方 ,内置
app.use(express.urlencoded({extended: false})); //post参数- username=kerwin&password=1234
app.use(express.json()); //post参数- {name:"",age:100}

// 应用级中间件  处理token
app.use((req, res, next) => {
    console.log("验证token")
    next();
});

// 应用级中间件
app.use('/home', HomeRouter);
app.use('/login', LoginRouter);

// 错误处理中间件
app.use((req, res) => {
    // send 默认是 200， 这里需要改一下状态
    res.status(404).send("404 not found");
})

// 服务器启动
app.listen(3000, () => {
    console.log("server start ........... ");
});