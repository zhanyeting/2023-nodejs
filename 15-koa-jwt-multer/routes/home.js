const Router = require('koa-router');
const router = new Router();

router.get('/', async(ctx) => {
    await ctx.render('home');
    // ctx.body = `<b>hello</b>`
});

module.exports = router;