const express = require('express');

const router = express.Router();

// get 请求, 用来展示login页面
router.get('/', (req, res) => {
    // if (req?.query?.username === 'zhangsan' && req?.query?.password === '123456') {
    //     res.send({ ok: 1});
    // } else {
    //     res.send({ ok: 0});
    // }

    // res.send(`<b>login page</b>`);  //send片段 & json
    // res.json({ ok: 0 });  // json
    // res.json([1,2,3]);  // json

    //渲染模板后返回给前端
    // res.render('login');  //找views文件夹下的login.ejs 
    res.render('login', {error: '', isShow: false});  // 还可以穿数据到 login.ejs 页面
});


// post 请求
router.post('/', (req, res) => {
    const {username, password} = req?.body || {};
    if (username === 'zhangsan' && password === '123456') {
        // res.send({ ok: 1});

        // 重定向到home
        res.redirect('/home');
    } else {
        // res.send({ ok: 0});

        console.log("登录失败。。。", `username=${username}, password=${password}`);
        res.render('login', {error: '用户名或密码不匹配', isShow: true});
    }
});


module.exports = router;