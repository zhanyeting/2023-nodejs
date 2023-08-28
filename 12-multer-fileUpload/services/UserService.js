const UserModel = require('../model/UserModel');

const UserService = {
    addUser: (params) => {
        return UserModel.create({...params});
    },
    updateUser: ({_id, username, password, age, avatar}) => {
        return UserModel.updateOne({_id}, {username, password, age, avatar});
    },

    deleteUser: ({_id}) => {
        return UserModel.deleteOne({_id});
    },

    getUser: (params) => {
        const {pageNo, pageSize} = params || {};
        if (!(pageNo && pageSize)) {
            return UserModel.find({}).sort({age: 1});
        } else {
            return UserModel.find({}, ['username', 'age']).sort({age: -1}).skip((pageNo-1)*pageSize).limit(pageSize);
        }
    }
}

module.exports = UserService;