const mongoose = require('mongoose');

// 连接数据库
mongoose.connect('mongodb://127.0.0.1:27017/node_project');

// 插入集合和数据,数据库 node_project 会自动创建