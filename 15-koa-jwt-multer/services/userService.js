// const mongoose = require('mongoose');
const UserModel = require('../model/userModel');

const UserService = {
    addUser: (params) => {
        return UserModel.create(params);
    },

    updateUser: (params) => {
        const _id = params?.id;
        return UserModel.updateOne({_id}, {...params});
    },

    deleteUser: (_id) => {
        return UserModel.deleteOne({_id});
    },

    getUser: (params) => {
        const {pageNo, pageSize} = params || {};

        // 分页查询
        if (pageNo && pageSize) {
            return UserModel.find({}, ['username', 'age']).sort({age: -1}).skip((pageNo-1)*pageSize).limit(pageSize);
        }
        // 查询所有
        return UserModel.find({}).sort({age: 1});
        
    },

    getAvatarById: (id) => {
        console.log(111111, id);
        // const _id = new mongoose.Types.ObjectId(id);
        // return UserModel.findOne({_id}, ['avatar']);
        return UserModel.findById(id, ['avatar']);
    },

    login: (username, password) => {
        return UserModel.find({username, password});
    }
}

module.exports = UserService;
