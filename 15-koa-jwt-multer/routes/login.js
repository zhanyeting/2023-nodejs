const Router = require('koa-router');
const UserController = require('../controllers/userController');
const router = new Router();

router.get('/', async(ctx) => {
    await ctx.render('login');
    // ctx.body = 'login page'
});

router.post('/', UserController.login);
module.exports = router;