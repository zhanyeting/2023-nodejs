
function render(res,data,type=""){
    res.writeHead(200, { 
        "Content-Type": `${type?type:"application/json"};charset=utf8`,
        "Access-control-allow-origin": '*',
    })
    res.write(data)
    res.end()
}

const apiRouter = {
    '/api/list': (req, res) => {
        // render(res, './static/home.html')
    }, 
    '/api/login': (req, res) => {
        const {searchParams} = new URL(req.url, 'http://127.0.0.1');
        const username = searchParams.get('username');
        const password = searchParams.get('password');

        if (username === 'zhangsan' && password === '123456') {
            render(res,`{"ok":1}`)
        } else {
            render(res,`{"ok":0}`)
        }
    },

    '/api/loginPost': (req, res) => {
        // 如何获取参数呢？ req.method === 'POST' 才能用 req.on 接收参数
        let postParam = '';
        req.on('data', chunk => postParam += chunk);
        req.on('end', () => {
            const {username, password} = JSON.parse(postParam);
            if (username === 'zhangsan' && password === '123456') {
                render(res, JSON.stringify({ok: 1}));
            } else {
                render(res, JSON.stringify({ok: 0}));
            }
        });
    }
}

module.exports = apiRouter;