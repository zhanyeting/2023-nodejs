const http = require('http');

// const router = require('./router');
// const apiRouter = require('./api');

const Router = {};
//express  use
function use(obj) {
    // Object.assign(Router, router, apiRouter);
    Object.assign(Router, obj);
}

function start() {
    http.createServer((req, res) => {
        const {pathname} = new URL(req.url, 'http://127.0.0.1');

        try {
            Router[pathname](req, res);
        }catch {
            Router['/404'](req, res);
        }
    }).listen(3000, () =>{
        console.log("server start ..... ");
    });
}

exports.start = start;
exports.use = use;