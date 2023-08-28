const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userType = {
    username: String,
    password: String,
    age: Number,
    // avatar: String,
}

// user 模型会对应 mongo 数据库中的 users 集合
const UserModel = mongoose.model('user', new Schema(userType));

module.exports = UserModel;