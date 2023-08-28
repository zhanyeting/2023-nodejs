const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserType = {
    username: String,
    password: String,
    age: Number,
}
// 模型user 将会对应 users 集合, 
const UserModel = mongoose.model('user', new Schema(UserType))

module.exports = UserModel;