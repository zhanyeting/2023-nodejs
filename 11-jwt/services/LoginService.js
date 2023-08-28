const UserModel = require('../model/UserModel');

const LoginService = {
    login: (username, password) => {
        return UserModel.find({username, password});
    }
}

module.exports = LoginService;