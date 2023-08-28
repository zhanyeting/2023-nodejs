var express = require('express');
var crypto = require('crypto');
var router = express.Router();

const encryptPassword = (val) => {
    const hmac = crypto.createHmac('sha256', 'secret-key');
    hmac.update(val);
    return hmac.digest('hex');
}

/* GET  */
router.get('/', function(req, res, next) {
    console.log("cookies === ", req.cookies);

    // cookies 中有登录的用户数据，就直接跳转到 home 页面
    if (req?.cookies?.username && req.cookies?.password){
        res.render('index', {
            title: req.cookies.username
        });
    } else {
       res.render('login', {error: '', isShow: false} );
    }
});

/* POST 处理请求 */
router.post('/', function(req, res, next) {
    console.log("cookies === ", req.cookies);

    // cookies 中有数据，就直接跳转到 home 页面
    if (req?.cookies?.username && req.cookies?.password){
        res.redirect('index', {
            title: req.cookies.username
        });
    } else {
        console.log("req.body ======= ", req.body);
        // 查询数据库，
        const {username, password} = req?.body || {};

        if (username === "zhangsan" && password === '123456'){
            res.cookie("username", username);
            res.cookie("password", encryptPassword(password));
            res.cookie("gender", 'female');

            res.render('index', {
                title: username
            });
        } else {
            res.render('login', {
                error: '用户名和密码不匹配',
                isShow: true,
            });
        }
    }
});

module.exports = router;
