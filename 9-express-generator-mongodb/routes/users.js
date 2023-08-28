const express = require('express');
const router = express.Router();
const UserModel = require('../model/UserModel');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
  // 读取前端的cookie值
  // console.log(req.cookies);

  // res.cookies('');
  // res.send({data: [1111111111, 33, 34354]});
});


// 添加用户
router.post('/add', function(req, res, next) {
  console.log(req.body);
  // 插入数据库
  // 1. 创建一个模型(user,限制filed类型), 一一对应数据库的集合(users)
  // user.create user.find user.delete user.update
  UserModel.create({...req.body}).then((data) => {
    res.send({ok: 1, data});
  }).catch((err) => {
    res.send({ok: 0});
    console.log("/users/add failed === ", err);
  });
});

//动态路由, 获取id
router.post('/update/:myid', function(req, res, next) {
  console.log(req.body, req.params.myid);
  const { username, password, age } = req?.body || {};
  UserModel.updateOne({_id: req.params.myid}, {
    username, password, age,
  }).then((data) => {
    res.send({ok: 1, data});
  }).catch((err) => {
    res.send({ok: 0});
    console.log("/users/update failed === ", err);
  });
});

// 删除用户
router.get('/delete/:id', (req, res) => {
  console.log(req.params.id);
  UserModel.deleteOne({
    _id: req.params.id
  }).then((data) => {
    res.send({ok: 1, data});
  }).catch((err) => {
    res.send({ok: 0});
    console.log("/users/delete failed === ", err);
  });
});


// 查询
router.get('/listAll', (req, res) => {
  UserModel.find({}).sort({age:1}).then((data) => {
    res.send({ok: 1, data});
  }).catch((err) => {
    res.send({ok: 0});
    console.log("/users/listAll failed === ", err);
  });
});

// 分页查询
router.get('/list', (req, res) => {
  console.log(req.query);

  const { pageNo, pageSize } = req?.query || {};
  UserModel.find({},["username","age"]).sort({age:1}).skip((pageNo-1)*pageSize).limit(pageSize)
  .then((data) => {
    res.send({ok: 1, data});
  }).catch((err) => {
    res.send({ok: 0});
    console.log("/users/list 分页 failed === ", err);
  });
});

module.exports = router;