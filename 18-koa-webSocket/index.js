const koa = require('koa');
const fs = require('fs');
const Router = require('koa-router');

const app = new koa();
const router = new Router();

router.get('/', async(ctx) => {
    ctx.body = {ok: 1, info: 'home'}
})
router.get('/chat', async(ctx) => {
    ctx.type = 'html';
    ctx.body = fs.createReadStream('public/chat.html');
})

// 注册路由
app.use(router.routes()).use(router.allowedMethods);

app.listen(3002);

// webSocket 服务器
// const { WebSocketServer } = require('ws');
const WebSocket = require('ws');
const WebSocketServer = WebSocket.WebSocketServer;
const wss = new WebSocketServer({ port: 8080});

wss.on('connection', function connection(ws, request, client){
    ws.on('error', (error) => {
        console.log("err====", error);
    })
    
    ws.on('message', function message(data) {
        console.log(`Receive a data: ${data} from ${client}`);
        // 转发消息给其他人
        wss.clients.forEach(client2 => {
            // 遍历的客户端不是自己，且其他客户端还保持连接，就广播消息给他们
            if (client2 !== ws && client2.readyState === WebSocket.OPEN) {
                client2.send(data, {binary: false})
            }
        })
    })

    ws.send('欢迎来到聊天室')
})


// //webscoket 响应
// const WebSocket = require('ws')
// const WebSocketServer = WebSocket.WebSocketServer
// const wss = new WebSocketServer({ port: 8080 });

// wss.on('connection', function connection(ws) {
//     ws.on('message', function message(data) {
//         console.log('received: %s', data);
//         //转发给其他人，
//         wss.clients.forEach(function each(client) {
//             if (client !== ws && client.readyState === WebSocket.OPEN) {
//                 client.send(data,{binary:false});
//             }
//         });

//     });

//     ws.send('欢迎来到聊天室');
// });