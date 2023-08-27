const http = require("http");
const https = require("https");
const EventEmitter = require("events");  // 发布订阅模式

let event = null;

http.createServer((req, res) => {
    const {pathname} = new URL(req.url, 'http://127.0.0.1:3000');

    switch(pathname) {
        case "/api/maoyan": 
            res.writeHead(200, {"content-type": "application/json;charset=utf-8"});
            
            // 这里进行事件监听，即开启订阅模式
            event = new EventEmitter();
            event.on("play", (data) => {
                console.log(" 事件被触发了 .... ");
                res.end(data)
            });

            getMaoyanEvent();
            break;

        default:
            res.writeHead(404);
            res.end("404 not found");
    }
}).listen(3000);

function getMaoyanEvent() {
    const url = 'https://i.maoyan.com/api/mmdb/movie/v3/list/hot.json?ct=%E5%8C%97%E4%BA%AC&ci=1&channelId=4';
    let data = '';

    https.get(url, (res) => {
        res.on("data", chunk => data += chunk);
        res.on("end", () => {
            // 这里收集完数据了，发布一下数据
            event.emit("play", data)
        });
    });
}
