const mysql2 = require('mysql2');

const promisePool = mysql2.createPool({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '',
    database: 'node_test',
    connectionLimit: 1,  //创建一个连接池

    // waitForConnections: true,
    // maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    // idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    // queueLimit: 0,
    // enableKeepAlive: true,
    // keepAliveInitialDelay: 0
}).promise();

module.exports = promisePool;

