const WebSocketType = {
    Error: 0,       // 错误
    GroupList: 1,   // 获取用户列表
    GroupChat: 2,   // 群聊
    SingleChat: 3,  // 私聊
}

function start(server) {
    const io = require('socket.io')(server);
    
    io.on('connection', socket => {
        console.log("连接成功.....", socket?.handshake?.query?.token);
        // 做个简单的 token 校验
        if (socket?.handshake?.query?.token) {
            socket.user = socket?.handshake?.query?.token; // 保存用户信息
            // 发送欢迎信息
            socket.emit(WebSocketType.GroupChat, {user: null, data: '欢迎来到聊天室'});
            // 群发，用户列表
            sendAll(io);
        } else {
            // socket.io 可以发送对象 消息，不需要用 JSON.stringify 包一层了
            socket.emit(WebSocketType.Error, {user: null, data: 'token 过期'})
        }

        socket.on(WebSocketType.GroupList, () => {
            const userList = Array.from(io.sockets.sockets).map(item => item[1]?.user)
            socket.emit(WebSocketType.GroupList, {user: null, data: userList})
        })
        socket.on(WebSocketType.GroupChat, (msg) => {
            // console.log(22222, msg);
            if (msg?.data){
                // 群发，也包括发给自己
                io.sockets.emit(WebSocketType.GroupChat, {user: socket.user, data: msg?.data})

                // 广播，不会发给自己
                // socket.broadcast.emit(WebSocketType.GroupChat, {user: socket.user, data: msg?.data})
            }
        })
        socket.on(WebSocketType.SingleChat, (msg) => {
            // console.log(3333, msg);
            if (msg?.data && msg?.to){
                // for (const item of io.sockets.sockets) {
                //     console.log(item[1], item[0]?.user, item[1]?.user === msg?.to);
                //     if (item[1]?.user === msg?.to) {
                //         item[1].emit(WebSocketType.SingleChat, {user: socket.user, data: msg?.data})
                //     }
                // }

                Array.from(io.sockets.sockets).forEach(item => {
                    if (item[1]?.user === msg?.to) {
                        item[1].emit(WebSocketType.SingleChat, {user: socket.user, data: msg?.data})
                    }
                })
            }
        })

        socket.on('disconnect', () => {
            console.log("关闭连接.....");
            sendAll(io);
        })
    })
}

function sendAll (io) {
    // console.log(io.sockets.sockets);   // map结构
    // 获取用户列表, 将map结构转换为 二位数组,  还要过滤一下 undefined 的用户
    const userList = Array.from(io.sockets.sockets).map(item => item[1]?.user)
    console.log(userList);
    io.sockets.emit(WebSocketType.GroupList, {user: null, data: userList})
}
module.exports = start;