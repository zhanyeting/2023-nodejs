const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// 引入 multer, 保存头像 file 和地址
const multer = require('multer');
const upload = multer({ dest: 'public/avatars' });

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// 相应前端的post请求-添加用户
router.post('/user', upload.single('avatar'), UserController.addUser);
// 动态路由, 获取id -更新用户
router.put('/user/:id', upload.single('avatar'), UserController.updateUser);
// 删除用户
router.delete('/user/:id', UserController.deleteUser);
// [分页] 查询-获取用户列表
router.get('/user', UserController.getUser);


// logout
router.get('/logout', UserController.logout);

module.exports = router;