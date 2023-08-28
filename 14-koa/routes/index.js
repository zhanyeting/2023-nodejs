const Router = require('koa-router');

const loginRouter = require('./login');
const homeRouter = require('./home');
const userRouter = require('./user');

const router = new Router();

// 路由加前缀，会让所有路由都加上前缀
// router.prefix('/api');

// 路由重定向（有2种写法）
router.redirect('/', '/home');
// router.get('/', (ctx) => {
//     ctx.redirect('/home')
// });
router.use('/login', loginRouter.routes(), loginRouter.allowedMethods());
router.use('/home', homeRouter.routes(), homeRouter.allowedMethods());
router.use('/api', userRouter.routes(), userRouter.allowedMethods());


module.exports = router;
