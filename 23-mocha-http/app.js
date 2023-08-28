const koa = require('koa');
const app = new koa();

app.use(ctx => {
    ctx.body = `<h1>hello</h1>`;
})

// app.listen(3000);

module.exports = app;

