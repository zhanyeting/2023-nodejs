const http = require("http");
const url = require('url');

http.createServer((req, res) => {
    // const {pathname, query} = url.parse(req.url, true);
    // const {callback} = query || {};
    // console.log(query);

    const {pathname, searchParams} = new URL(req.url, "http://127.0.0.1:3000");
    const callback = searchParams.get("callback");
    // console.log(searchParams);
    
    switch (pathname) {
        case "/api/home":
            // jsonp 处理跨域
            if (callback) {
                res.writeHead(200);
                // res.end(`${callback}({name: "Tom",age: 100})`)
                res.end(`${callback} (${JSON.stringify({
                    name: "Tom",
                    age: 100,
                })})`)

            // cors 处理跨域
            } else {
                res.writeHead(200, {
                    "Content-Type": "application/json;charset=utf-8",
                    // cors 配置 * ，表示所有网站不受同源策略影响
                    "access-control-allow-origin": "*",
                    // 指定单一网站不受同源策略影响
                    // "access-control-allow-origin": "http://127.0.0.1:5500",
                });
                res.end(JSON.stringify({
                    name: "Tom",
                    age: 100,
                }));
            }
            break;

        default:
            res.writeHead(404);
            res.end("404 not found");
            break;
    }    
}).listen(3000)