const koa = require('koa');
const router = require('./routes');
const Static = require('koa-static');
const Views = require('koa-views');
const bodyParser = require('koa-bodyparser');
const path = require('path');
const session = require('koa-session-minimal');

// 引入 mongodb 数据库
require('./config/dbConfig');

const app = new koa();

// 配置 ejs 模版
app.use(Views(path.join(__dirname, './views'), {extension: 'ejs'}));

// 配置静态资源
app.use(Static(path.join(__dirname, 'public')));

// 配置 post 请求参数
app.use(bodyParser());

// 登录鉴权-session
app.use(session({
    key: 'SESSION_ID',
    cookie: {
        maxAge: 1000 * 60
    }
}))

app.use(async(ctx, next) => {
    //排除login相关的路由和接口
    if (ctx?.url?.includes('login')) {
        await next();
        return;
    }

    // session 过期了，跳转登录页面
    if (!ctx?.session?.user) {
        // 
        console.log(1111111111);
        await ctx.redirect('/login');
        // ctx.body = {
        //     ok: 1,
        //     err: 'session expired'
        // }
        return ;
    }

    // session 没过期，再次访问页面，需要更新一下session
    ctx.session.date = Date.now();
    await next();
})
// 注册路由中间件
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);