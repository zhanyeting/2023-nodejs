const WebSocket = require('ws');
const JWT = require('../util');
const WebSocketServer = WebSocket.WebSocketServer; 

const wss = new WebSocketServer({ port: 8080 });
wss.on('connection', function connection(ws, req) {
    const newUrl = new URL(req?.url, 'http://locahost:3000');
    const token = newUrl?.searchParams?.get('token');
    // console.log(11111, token);

    // 校验token
    const payload = JWT.verify(token);
    // console.log(2222, payload);
    if (payload) {
        // 登录成功后，将 user 信息存储到 ws 中，后面发送消息时可以取用
        ws.user = payload.data;
        ws.send(createMessage(
            WebSocketType.GroupChat, null, '欢迎来到聊天室'
        ), {binary: false});

        // 群发，发送用户列表数据给客户端
        sendAll();
    } else {
        ws.send(createMessage(
            WebSocketType.Error, null, 'token 过期了'
        ))
    }
    

    ws.on('error', (error) => console.log(error) );

    ws.on('message', function message(data){
        console.log(`Receive data: ${data} `);
        // console.log(1000, data);

        const msgObj = JSON.parse(data);        
        switch (msgObj.type) {
            case WebSocketType.GroupList:
                // 获取用户列表
                // console.log(1111, wss.clients);
                console.log(1111, Array.from(wss.clients).map(c => c.user));
                const userList = Array.from(wss.clients).map(c => c.user);
                // 发送用户列表数据给 客户端
                ws.send(createMessage(WebSocketType.GroupList, null, userList));
                break;
        
            case WebSocketType.GroupChat:
                // 群聊, 广播消息
                wss.clients.forEach(item => {
                    // 不是自己，才转发给其他人
                    if (item !== ws && item.readyState === WebSocket.OPEN) {
                        console.log(2222, msgObj.data, ws?.user);
                        item.send(
                            createMessage(WebSocketType.GroupChat, ws?.user, msgObj.data), 
                            {binary: false}
                        )
                    }
                })
                break;
        
            case WebSocketType.SingleChat:
                wss.clients.forEach(item => {
                    // 找到通信人，再发送消息
                    if (item?.user?.username === msgObj.to && item.readyState === WebSocket.OPEN){
                        item.send(
                            createMessage(WebSocketType.SingleChat, ws?.user, msgObj.data),
                            {binary: false}
                        )
                    }
                })
                break;
        
            default:
                break;
        }
    })
    // ws.on('message', function message(data) {
    //     console.log(`Receive data: ${data} `);

    //     // 转发消息给其他人
    //     wss.clients.forEach(item => {
    //         // 不是自己才转发
    //         if(item!==ws && item.readyState === WebSocket.OPEN) {
    //             item.send(data, {binary: false})
    //         }
    //     })
    // })

    // ws.send('welcome to chat room.')

    ws.on("close", () => {
        wss.clients.delete(ws.user);
                // console.log(ws.user)
        sendAll();
        console.log('关闭连接。。。。');
    })
});

const WebSocketType = {
    Error: 0,      // 错误
    GroupList: 1,  // 获取列表
    GroupChat: 2,  // 群聊
    SingleChat: 3, // 私聊 
}

function createMessage (type, user, data) {
    return JSON.stringify({
        type,
        user,
        data,
    })
} 

function sendAll (){
    wss.clients.forEach(item => {
        if (item.readyState === WebSocket.OPEN){
            item.send(
                createMessage(WebSocketType.GroupList, null, Array.from(wss.clients).map(c => c.user)), 
                {binary: false}
            )
        }
    })
}