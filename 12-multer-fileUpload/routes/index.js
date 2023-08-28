var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  // 首页校验一下 token 

  res.render('index', { title: 'Express' });
});

/* 
// test JWT token的 加密与验证过程
const JWT = require('jsonwebtoken');

// 因为设置了 expires 每次生成的 token 都会不一样
// 加密的数据是 string 类型的，如果需要设置 expires，那么需要将 payload 设置为一个包含 data 的对象
let data = "testnode";
// const token = JWT.sign('testnode', 'secret');  // 默认过期时间为 1h
// const token = JWT.sign({data:'testnode'}, 'secret', { expiresIn: '10s' });
// token =  eyJhbGciOiJIUzI1NiJ9.dGVzdG5vZGU.ZBn4_Q3afckTUIyR7MUtk23X74gXYrg7DrM8EpFZGOg
// 解密后 =  { data: 'testnode', iat: 1691309341, exp: 1691309351 }


// 加密的数据是 Object 类型的，不需要将 payload 转化为包含 data 的对象
data = {username: 'aaa', age: 100};
const token = JWT.sign(data, 'secret', { expiresIn: '10s' });
// const token = JWT.sign({data}, 'secret', { expiresIn: '10s' });

console.log("token = ", token);

console.log("解密后 = ", JWT.verify(token, 'secret'));
// 解密后 =  testnode 

setTimeout(() => {
  console.log("9s = ", JWT.verify(token, 'secret'));
}, 9000);

setTimeout(() => {
  try {
    console.log("11s = ", JWT.verify(token, 'secret'));
  }catch {
    console.log('jwt expired');
  }
}, 11000);

 */
module.exports = router;
