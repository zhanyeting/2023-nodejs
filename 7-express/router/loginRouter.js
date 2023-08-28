const express = require('express');

const router = express.Router();

// 路由级别中间件 - 响应前端的get请求
router.get('/', (req, res) => {
    console.log(req.query);
    const {username, password} = req?.query || {};
    
    if (username === 'zhangsan' && password === '123456') {
        res.header({
            "access-control-allow-origin": '*'
        })
        res.send({ok: 1});  //必须配置中间件
    } else {
        res.send({ok: 0});
    }
});

//路由级别-响应前端的post请求
router.post('/', (req, res) => {
    console.log("post 参数 === ",req.body);
    const {username, password} = req?.body || {};
    
    if (username === 'zhangsan' && password === '123456') {
        res.send({ok: 1});
    } else {
        res.send({ok: 0});
    }
});

//路由级别-响应前端的put ,delete请求

module.exports = router;