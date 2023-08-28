const koa = require('koa');
const path = require('path');
const bodyparser = require('koa-bodyparser');
const Static = require('koa-static');
const Views = require('koa-views');
// 引入 mongodb 数据库
require('./config/dbConfig');
const JWT = require('./utils/jwt');

const router = require('./routes');

const app = new koa();

// 配置 ejs 模块引擎
app.use(Views(path.join(__dirname, './views'), {extension: 'ejs'}));

// 配置静态资源文件夹
app.use(Static(path.join(__dirname, 'public')));

// 解析 post 请求参数
app.use(bodyparser());

// token 拦截处理 
app.use(async (ctx, next) => {
    // 排除与 login 相关的页面和接口
    if (ctx.url?.includes('login')) {
        await next();
        return;
    }

    const token = ctx?.headers?.authorization;  // 'null'
    console.log('token === ', token, ctx.url);
    if (!token) {
        console.log(11111111);
        await next();
        return;
    }
    const payload = JWT.verify(token);
    console.log(2222222, payload, ctx.url);

    if (!payload) {
        // token 过期了
        if (ctx.url?.includes('api')){
            // 是接口
            ctx.status = 401;
            ctx.body = {errInfo: 'token expired'};
            await next();
            return;
        } 
        console.log(44444);

        // 是页面
        ctx.redirect('/login');
        return ;
    } 
console.log(55555555);
    // 重新生成 token
    const newToken = JWT.generate({
        _id: payload?.data?.JWT_id,
        username: payload?.data?.username,
    }, '1d');
    ctx.set('Authorization', newToken);
    await next();
})

// 注册路由中间件
app.use(router.routes()).use(router.allowedMethods());


// 启动服务器
app.listen(3000);