const koa = require('koa');
const path = require('path');
const bodyParser = require('koa-bodyparser');
const Static = require('koa-static');
const View = require('koa-views');
const router = require('./routes');

const app = new koa();


// 配置 ejs 模板
app.use(View(path.join(__dirname, './views'), {extension: 'ejs'}));

// 配置静态路由
app.use(Static(path.join(__dirname, 'public')));

// 配置能在 ctx 中获取到 post 参数
app.use(bodyParser());

// 注册路由中间件
app.use(router.routes()).use(router.allowedMethods());

app.listen(9000)