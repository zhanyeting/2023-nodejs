const UserModel = require("../model/UserModel");

const UserService = {
    addUser: (params) => {
        return UserModel.create({...params});
    },

    updateUser: (params) => {
        return UserModel.updateOne({_id: params.id}, {
            ...params
        });
    },

    deleteUser: (_id) => {
        return UserModel.deleteOne({_id});
    },

    getUser: (pageNo, pageSize) => {
        if (!(pageNo && pageSize)){
            // 查询全部
            return UserModel.find({}).sort({age: 1});
        } 

        // 分页查询
        return UserModel.find({}).sort({age: -1}).skip((pageNo-1)*pageSize).limit(pageSize);
    },

    login: (username, password) => {
        // 登录
        return UserModel.find({username, password});
    }
}

module.exports = UserService;