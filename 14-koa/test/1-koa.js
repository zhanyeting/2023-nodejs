const koa = require('koa');

const app = new koa();

// ctx.body 字符串，html，object
app.use((ctx, next) => {
    // ctx.body = 'hello world';
    ctx.body = `<b>hello world</b>`;
    // ctx.body = {
    //     ok: 0,
    //     data: [111,222,333]
    // };
});

app.listen(3000);