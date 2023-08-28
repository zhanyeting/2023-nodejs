const Router = require('koa-router');
const router = new Router();

router.get('/', async(ctx, next) => {
    // ctx.body =  `
    //     <html>
    //         <div><b> home page </b></div>
    //     </html>
    // `;

    await ctx.render('home', {title: 'zhangsan'});
});


module.exports = router;