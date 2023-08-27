const http = require("http");
const https = require("https");
const cheerio = require('cheerio');

http.createServer((req, res) => {
    // https://i.maoyan.com/api/mmdb/movie/v3/list/hot.json?ct=%E5%8C%97%E4%BA%AC&ci=1&channelId=4
    const {pathname, searchParams} = new URL(req.url, "https://127.0.0.1:3000/");

    switch(pathname) {
        case "/api/maoyan": 
            res.writeHead(200, {
                "content-type": "application/json;charset=utf-8",
                "access-control-allow-origin": "*",
            })
            // getMaoyanList(res);
            // 回调函数解耦
            getMaoyanList((data) => {
                res.end(data);
            })
            break;

        case "/api/xiaomiyoupin": 
            res.writeHead(200, {
                "content-type": "application/json;charset=utf-8",
                "access-control-allow-origin": "*",
            })
            postMiyoupinList((data) => {
                res.end(data);
            })
            break;

        case "/api/mapyan/splider": 
            res.writeHead(200, {
                "content-type": "application/json;charset=utf-8",
                "access-control-allow-origin": "*",
            })
            getMaoyanPage(data => res.end(data))
            break;

        default: 
            res.writeHead(404);
            res.end("404 not found")
            break;
    }
}).listen(3000);


// get 猫眼
function getMaoyanList(cb) {
    const maoyanUrl = 'https://i.maoyan.com/api/mmdb/movie/v3/list/hot.json?ct=%E5%8C%97%E4%BA%AC&ci=1&channelId=4';
    let data = "";

    https.get(maoyanUrl, (res) => {
        // 收集一段一段的数据
        res.on("data", (chunk) => {
            data += chunk;
        });

        // 数据收集完毕
        res.on("end", () => {
            // console.log(data);
            // response.end(data)
            cb(data);
        })

    })
}


// post 小米有品
function postMiyoupinList(cb) {
    let data = '';
    // https://m.xiaomiyoupin.com/mtop/mf/resource/data/batchList
    const options = {
        protocol: 'https:',
        hostname: 'm.xiaomiyoupin.com',
        port: '443',
        path: '/mtop/mf/resource/data/batchList',
        method: 'POST',
        headers: {
            "content-type": "application/json;charset=utf-8",
            // 'Content-Type': 'application/x-www-form-urlencoded',
            // 'Content-Length': Buffer.byteLength(postData)
        }
    }
    const req = https.request(options, (res) =>{
        res.on("data", chunk => data += chunk);
        res.on("end", () => cb(data))
    });
    // 写入 post 请求参数
    req.write(JSON.stringify([{},["newer_popup_ad","download_options"]]));
    req.end();
}


// get 爬虫猫眼网页
function getMaoyanPage(cb){
    const options = {
        // protocol: 'https:',
        hostname: 'i.maoyan.com',
        port: 443,
        path: '/',
        method: 'GET',
        headers: {
            "content-type": "text/html;charset=utf-8",
        }
    }

    let data = "";
    const req = https.request(options, res => {
        res.on("data", chunk => data += chunk);
        res.on("end", () => cb(spider(data)))
    });
    req.end();
}

function spider(data){
    const $ = cheerio.load(data);
    const $movieList = $('.main-block');
    // console.log($movieList);

    let movieList = [];
    $movieList.each((index, item) => {
        movieList.push({
            avatar: $(item).find(".default-img-bg img").attr('src'),
            title: $(item).find(".title").text(),
            grade: $(item).find(".grade").text(),
            actor: $(item).find(".actor").text(),
            showInfo: $(item).find(".show-info").text(),
        });
    });
    // console.log(movieList);
    return JSON.stringify(movieList)
}