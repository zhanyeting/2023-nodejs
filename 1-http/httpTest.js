/* 文件读写 */
// const fs = require('fs');
// fs.readFile('./charector.png', 'utf-8', (err, content) => {
//     console.log( err, content);
// });



/* 进程管理 */


/* 网络通信 */
const http = require('http');
/* http.createServer((req, res) => {
    console.log(111, req.url);
    res.writeHead(200, {
        'content-type': 'text/html;charset=utf-8'
        // 'content-type': 'text/plain;charset=utf-8'
    })
    res.write(`
        <html>
            <b> hello world </b>
            <div> 大家好 <div>
        </html>
    `);
    res.end();
}).listen(3000, () => {
    console.log("server start.....");
}); */

/* const server = http.createServer();
// 监听请求事件
server.on("request", (req, res) => {
    console.log(111, req.url);
    res.writeHead(200, {'content-type': 'application/json'})
    res.end(JSON.stringify({data: "hello"}));
});

server.listen(3000, () => {
    console.log("server start............");
}) */


/* url 模块 ----> parse  format resolve  */
const url = require('url');
const urlStr = 'https://www.baidu.com:443/ad/index.html?id=8&name=mouse#tag=110';
const urlParseObj2 = url.parse(urlStr, true);  // 加上true, query 返回的就是对象
console.log(urlParseObj2.query); // [Object: null prototype] { id: 8, name: 'mouse' }
const urlParseObj = url.parse(urlStr);
console.log(urlParseObj);
/*
Url {
  protocol: 'https:',
  slashes: true,
  auth: null,
  host: 'www.baidu.com:443',
  port: '443',
  hostname: 'www.baidu.com',
  hash: '#tag=110',
  search: '?id=8&name=mouse',
  query: 'id=8&name=mouse',
  pathname: '/ad/index.html',
  path: '/ad/index.html?id=8&name=mouse',
  href: 'https://www.baidu.com:443/ad/index.html?id=8&name=mouse#tag=110'
} 
 */

console.log(url.format(urlParseObj));
// https://www.baidu.com:443/ad/index.html?id=8&name=mouse#tag=110


console.log(url.resolve('/one/two/three', 'four'));   // one/two/four
console.log(url.resolve('/one/two/three/', 'four'));  // one/two/three/four
 
console.log(url.resolve('http://example.com', '/one'));      // http://example.com/one
console.log(url.resolve('http://example.com/', '/one'));     // http://example.com/one
console.log(url.resolve('http://example.com/a/b/c/', '/two'));  // http://example.com/two
console.log(url.resolve('http://example.com/one/', '/two'));    // http://example.com/two

console.log(url.resolve('http://example.com', 'one'));         // http://example.com/one
console.log(url.resolve('http://example.com/', 'one'));        // http://example.com/one
console.log(url.resolve('http://example.com/a/b/c', 'one'));   // http://example.com/a/b/one
console.log(url.resolve('http://example.com/a/b/c/', 'one'));  // http://example.com/a/b/c/one
console.log('\n\n');



/* querystring 模块  ---> parse  stringify  escape/unescape */
const querystring = require('querystring');
const qsStr = 'x=3&y=4';
const qsParseObj = querystring.parse(qsStr);
console.log(qsParseObj);   
// [Object: null prototype] { x: '3', y: '4' }
console.log(querystring.stringify(qsParseObj));   
// x=3&y=4

const str = 'id=3&city=北京&url=https://www.baidu.com';
const strEscape = querystring.escape(str);
console.log(strEscape); 
// id%3D3%26city%3D%E5%8C%97%E4%BA%AC%26url%3Dhttps%3A%2F%2Fwww.baidu.com
console.log(querystring.unescape(strEscape));
// id=3&city=北京&url=https://www.baidu.com
console.log('\n\n');
