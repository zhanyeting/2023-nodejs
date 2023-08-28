var express = require('express');
var router = express.Router();

const LoginController = require('../controllers/LoginController');


/* GET  */
router.get('/', function(req, res, next) {
    // 这里需要判断 是否有 session, 有的话，不需要登陆
    if (req?.session?.user) {
        res.render('index');
        return ;
    }
    res.render('login', {error: '', isShow: false} );
});

/* POST 处理请求 */
router.post('/', LoginController.login);


// logout


module.exports = router;
