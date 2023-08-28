const fs = require('fs');
const path = require('path');
const mime = require('mime');

function render(res, path, type=''){
    res.writeHead(200, {
        "content-type": `${type ? type : 'text/html'};charset=utf-8`,
        "Access-control-allow-origin": '*',
    });
    res.write(fs.readFileSync(path, 'utf-8'));
    res.end();
}

const router = {
    '/': (req, res) => {
        render(res, './static/home.html')
    }, 
    '/home': (req, res) => {
        render(res, './static/home.html')
    }, 
    '/login': (req, res) => {
        render(res, './static/login.html')
    }, 
    '/404': (req, res) => {
        // 处理一些 css js img 等静态资源
        if (readStaticFile(req,res)) {
            return;
        }
        res.writeHead(404, {"content-type": 'text/html;charset=utf-8'});
        res.write(fs.readFileSync('./static/404.html', 'utf-8'));
        res.end();
    }, 
    // "/favicon.ico":(req,res)=>{
    //     render(res,"./static/favicon.ico","image/x-icon")
    // }
}

// 静态资源文件管理
function readStaticFile (req, res) {
    const {pathname} = new URL(req.url, 'http://127.0.0.1');

    // if (pathname === '/') return false;
    const staticUrl = path.join(__dirname, '/static', pathname);
    // console.log(1000, pathname, staticUrl, fs.existsSync(staticUrl));
    if (fs.existsSync(staticUrl)) {
        render(res, staticUrl, mime.getType(pathname.split('.')[1]))
        return true;
    } else {
        return false;
    }
}
module.exports = router;