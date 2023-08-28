const server = require('./server');
const router = require('./router');
const apiRouter = require('./api');

//注册路由
server.use(router);
server.use(apiRouter);

// 启动服务器
server.start();
