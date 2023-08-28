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


/**
 * 
 * @api {POST} /api/user 添加用户
 * @apiName addUser
 * @apiGroup userGroup
 * @apiVersion  1.0.0
 * 
 * 
 * @apiParam  {String} username 用户名
 * @apiParam  {String} password 密码
 * @apiParam  {Number} age 年龄
 * @apiParam  {File} avatar 头像
 * 
 * @apiSuccess (200) {Number} ok 成功标识
 * @apiSuccess (200) {Object} data 添加的数据对象
 * 
 * @apiParamExample  {multipart/form-data} Request-Example:
 * {
 *     username:　'zhangsan',
 *      password: '123456',
 *      age: 18,
 *      avatar: File[Object],
 * }
 * 
 * 
 * @apiSuccessExample {type} Success-Response:
 * {
 *     ok: 1,
 *     data: {
 *      _id: adewdweiuhiuhcoidcsi,
 *      username:　'zhangsan',
 *      password: '123456',
 *      age: 18,
 *      avatar: File[Object],
 *     }
 * }
 * 
 * 
 */
router.post('/user', upload.single('avatar'), UserController.addUser);
/**
 * 
 * @api {PUT} /api/user/:id 更新用户
 * @apiName updateUser
 * @apiGroup userGroup
 * @apiVersion  1.0.0
 * 
 * 
 * @apiParam  {String} username 用户名
 * @apiParam  {String} password 密码
 * @apiParam  {Number} age 年龄
 * @apiParam  {File} avatar 头像
 * 
 * @apiSuccess (200) {Number} ok 成功标识
 * @apiSuccess (200) {Object} data 添加的数据对象
 * 
 * @apiParamExample  {multipart/form-data} Request-Example:
 * {
 *     username:　'zhangsan',
 *      password: '123456',
 *      age: 18,
 *      avatar: File,
 * }
 * 
 * 
 * @apiSuccessExample {type} Success-Response:
 * {
 *     ok: 1,
 *     data: {
 *      _id: adewdweiuhiuhcoidcsi,
 *      username:　'zhangsan',
 *      password: '123456',
 *      age: 18,
 *      avatar: File,
 *     }
 * }
 * 
 * 
 */
// 动态路由, 获取id -更新用户
router.put('/user/:id', upload.single('avatar'), UserController.updateUser);
/**
 * 
 * @api {DELETE} /api/user/:id 删除用户
 * @apiName deleteUser
 * @apiGroup userGroup
 * @apiVersion  1.0.0
 * 
 * @apiSuccess (200) {Number} ok 成功标识
 * 
 * @apiSuccessExample {type} Success-Response:
 * {
 *     ok: 1,
 *     data: {
 *      _id: adewdweiuhiuhcoidcsi,
 *      username:　'zhangsan',
 *      password: '123456',
 *      age: 18,
 *      avatar: File,
 *     }
 * }
 * 
 * 
 */
// 删除用户
router.delete('/user/:id', UserController.deleteUser);
// [分页] 查询-获取用户列表
router.get('/user', UserController.getUser);


// logout
router.get('/logout', UserController.logout);

module.exports = router;