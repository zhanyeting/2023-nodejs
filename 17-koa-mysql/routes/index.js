const Router = require('koa-router');
const homeRouter = require('./home');
const userRouter = require('./user');

const router = new Router();

router.redirect('/', '/home');
router.use('/home', homeRouter.routes(), homeRouter.allowedMethods());
router.use('/api', userRouter.routes(), userRouter.allowedMethods());

module.exports = router;