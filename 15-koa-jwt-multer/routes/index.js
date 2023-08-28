const Router = require('koa-router');

const loginRouter = require('./login');
const homeRouter = require('./home');
const userRouter = require('./user');

const router = new Router();

// 重定向到首页
router.redirect('/', '/home');

router.use('/login', loginRouter.routes(), loginRouter.allowedMethods());
router.use('/home', homeRouter.routes(), homeRouter.allowedMethods());
router.use('/api', userRouter.routes(), userRouter.allowedMethods());

module.exports = router;
