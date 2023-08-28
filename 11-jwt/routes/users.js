const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// 相应前端的post请求-添加用户
router.post('/user', UserController.addUser);
// 动态路由, 获取id -更新用户
router.put('/user/:id', UserController.updateUser);
// 删除用户
router.delete('/user/:id', UserController.deleteUser);
// [分页] 查询-获取用户列表
router.get('/user', UserController.getUser);


// logout
router.get('/logout', UserController.logout);

module.exports = router;