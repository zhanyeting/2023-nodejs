const express = require('express');
const koa = require('koa');

const appExpress = express();
const appKoa = new koa();
/* 
// 同步来看，express 和 koa 没啥区别
// express 同步
appExpress.use((req, res, next) => {
    console.log(11111);
    next();
    console.log(4444);
    res.send('hello')
});
appExpress.use((req, res, next) => {
    console.log(333);
})
//  1111  333 4444

// koa 同步
appKoa.use((ctx, next) => {
    console.log('koa 1111');
    next();
    console.log('koa 4444');
    ctx.body = 'hello koa';
});
appKoa.use(() => {
    console.log('koa 3333');
});
// koa 1111
// koa 3333
// koa 4444

 */
// 异步
appExpress.use(async (req, res, next) => {
    console.log(11111);
    await next();
    console.log(4444);
    res.send('hello')
});
appExpress.use(async (req, res, next) => {
    console.log(2222);
    await delay(1000);
    console.log(333);
})
// 1111   2222  4444 定时器 333

const delay = (time) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('定时器');
            resolve();
        }, time);
    });
}

// koa 异步
appKoa.use(async(ctx, next) => {
    console.log('koa 1111');
    await next();
    console.log('koa 4444');
    ctx.body = 'hello koa';
});
appKoa.use(async() => {
    console.log('koa 2222');
    await delay(1000);
    console.log('koa 3333');
});
// koa 1111
// koa 2222
// 定时器
// koa 3333
// koa 4444

appExpress.listen(3000);
appKoa.listen(3001);