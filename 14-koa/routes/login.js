const Router = require('koa-router');
const UserController = require('../controllers/userController');

const router = new Router();

router.get('/', async(ctx, next) => {
    await ctx.render('login', {error: '', isShow: false});
});

router.post('/', UserController.login);

/* router.get('/', async (ctx, next) => {
    // 获取前端传来的 get 参数
    console.log(ctx.query, ctx.querystring);

    // ctx.body =  `
    //     <html>
    //         <div><b> login page </b></div>
    //     </html>
    // `;

    await ctx.render('login', {error: '', isShow: false});
});

router.post('/', async(ctx, next) => {
    // 获取前端传来的 post 参数
    console.log(ctx.request.body);
    // ctx.body = {
    //     ok: 1,
    // }
}); */

module.exports = router;