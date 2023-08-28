const LoginService = require('../services/LoginService');
const JWT = require('../util');
const LoginController = {
    login: async (req, res) => {
        const {username, password} = req?.body || {};
        const data = await LoginService.login(username, password);
        if (data?.length > 0) {
            // // 登陆成功后，设置 session
            // req.session.user = data[0]; //设置session对象，默认存在内存中

            // 登陆成功后，设置 token
            const token = JWT.generate({
                id: data[0]._id,
                username: data[0].username,
                age: data[0].age,
            }, '1d')
            //token返回在header
            res.header('Authorization', token);

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