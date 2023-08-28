const Router = require('koa-router');
const UserController = require('../controllers/userController');

const router = new Router();

router.get('/user', UserController.getUser)
.post('/user',  UserController.addUser)
.put('/user/:id', UserController.updateUser)
.delete('/user/:id', UserController.deleteUser);

module.exports = router;