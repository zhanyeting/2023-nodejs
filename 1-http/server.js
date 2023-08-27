const http = require('http');
const url = require('url');
// const url = require('url');
const querystring = require('querystring');

const moduleStatus = require('./module/getStatus.js');
const moduleHtml = require('./module/getHtml.js');

// 创建服务器
const server = http.createServer();

server.on("request", (req, res) => {
    // req 接收浏览器传过来的参数
    // res 返回渲染的内容
    const { pathname,  query } = url.parse(req.url, true);
    // http://localhost:3000/list?name=tom&age=100
    const { name, age } = query || {};
    console.log(pathname, query, name, age);
    
    res.writeHead(
        moduleStatus.renderStatus(pathname), 
        {"Content-Type": 'text/html;charset=utf-8'}
    );
    res.write(moduleHtml.renderHtml(pathname));
    res.end();
});

server.listen(3000, () => {
    console.log("server start ....... ");
});


const myURL = new URL('/foo', 'https://example.org/');  // https://example.org/foo
var a = new URL('https://www.baidu.com:443/ad/index.html?id=8&name=mouse#tag=110');
console.log(myURL, a);   
// a.searchParams.get('name')    // mouse

for (let item of a.searchParams ){
    console.log(item);
}
/*// [ 'id', '8' ]
// [ 'name', 'mouse' ] */

for(const [key, value] of a.searchParams) {
    console.log(key, value);
}
// id 8
// name mouse