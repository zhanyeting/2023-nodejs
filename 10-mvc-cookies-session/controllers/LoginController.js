const LoginService = require('../services/LoginService');
const LoginController = {
    login: async (req, res) => {
        const {username, password} = req?.body || {};
        const data = await LoginService.login(username, password);
        if (data?.length > 0) {
            // 登陆成功后，设置 session
            req.session.user = data[0]; //设置session对象，默认存在内存中
            res.send({ok:1, data});
        } else {
            // res.render('login', {
            //     error: '用户名和密码不匹配',
            //     isShow: true,
            // })
            res.send({ok:0});
        }
    }
}

module.exports = LoginController;