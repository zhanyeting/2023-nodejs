const Router = require('koa-router');
const UserController = require('../controllers/userController');
const multer = require('@koa/multer');
const upload = multer({dest: 'public/avatars/'});

const router = new Router();

router.get('/user', UserController.getUser)
.post('/user', upload.single('avatar'), UserController.addUser)
.put('/user/:id', upload.single('avatar'), UserController.updateUser)
.del('/user/:id', UserController.deleteUser);

module.exports = router;