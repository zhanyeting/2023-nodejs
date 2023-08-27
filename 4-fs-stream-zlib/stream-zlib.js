const http = require('http');
const fs = require('fs');
const zlib = require('zlib');

const gzip = zlib.createGzip();

// const readstream  = fs.createReadStream('./test.js');
// const writestream  = fs.createWriteStream('./test-gzip.js', 'utf-8');

// readstream.pipe(gzip).pipe(writestream);


http.createServer((req, res) => {
    const {pathname} = new URL(req.url, "http://127.0.0.1:3000/");
    switch(pathname){
        case '/api/zlibFile':
            const readstream  = fs.createReadStream('./test.js');
            res.writeHead(200, {
                // "content-type": 'text/plain;charset=utf-8',
                "content-type": 'application/x-javascript;charset=utf-8',
                'content-Encoding': 'gzip',
            })
            readstream.pipe(gzip).pipe(res);  // gzip压缩（27.5kB）
            // readstream.pipe(res);   // 不走gzip压缩（78.1kB），需要去掉 Head 中的 Encoding 
            // res.end()
            break;

        default: 
            res.writeHead(404);
            res.end('404 not found');
            break;
    }
}).listen(3000);


/* 
// 读入流
const rs = fs.createReadStream("./1.txt","utf-8")
rs.on("data",(chunk)=>{
    console.log("chunk-",chunk)
})
rs.on("end",()=>{
    console.log("end")
})
rs.on("error",(err)=>{
    console.log(err)
})

// 写入流
const ws = fs.createWriteStream("./2.txt","utf-8")
ws.write("1111111111111111111")
ws.write("22222222222222222222")
ws.write("33333333333")
ws.end()

// 管道 pipe 
const readStream = fs.createReadStream("./1.txt")
const writeStream = fs.createWriteStream("./2.txt")
readStream.pipe(writeStream)
 */