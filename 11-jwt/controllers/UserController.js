const UserService = require('../services/UserService');

const UserController = {
    addUser: async (req, res, next) => {
        console.log(req.body);
        // 插入数据库
        // 1. 创建一个模型(user,限制filed类型), 一一对应数据库的集合(users)
        // user.create user.find user.delete user.update
        const {username,password,age} = req.body;
        
        await UserService.addUser({username, password, age});
        res.send({ok: 1});
        await UserService.getUser();

    },

    updateUser: async(req, res, next) => {
        const _id = req?.params?.id;
        const { username, password, age } = req?.body || {};
        UserService.updateUser({_id, username, password, age})
        .then((data) => {
            res.send({
                ok: 1,
                data,
            })
        }).catch((error) => {
            res.send({
                ok: 0,
                error: err,
            })
        }).finally(() => {
            UserService.getUser();
        })
    },

    deleteUser: async(req, res, next) => {
        UserService.deleteUser({_id: req?.params?.id})
        .then((data) => {
            res.send({
                ok: 1,
                data,
            })
        }).catch((error) => {
            res.send({
                ok: 0,
                error: err,
            })
        }).finally(() => {
            UserService.getUser();
        })
    },

    getUser: async(req, res, next) => {
        UserService.getUser(req?.query || {})
        .then((data) => {
            res.send({
                ok: 1,
                data,
            })
        }).catch((err) => {
            res.send({
                ok: 0,
                error: err,
            })
        });
    },

    logout: (req, res) => {
        req.session.destroy(() => {
            res.send({ok: 1})
        })
    }
}

module.exports = UserController;