const assert = require('assert');
const axios = require('axios');
const { describe, it, after, before } = require('mocha');
const app = require('../app');

// describe('测试 http 请求', () => {
//     it('server koa test 返回html代码片段测试', async () => {
//         const res = await axios.get('http://localhost:3000');
//         assert.strictEqual(res.data, '<h1>hello</h1>')
//     })
// })

describe('koa server http test, 测试用例中启动服务器', () => {
    let server = app.listen(3000);
    it('返回 html 代码片段 - 自启动服务器 ', async() => {
        const res = await axios.get('http://localhost:3000');
        assert.strictEqual(res.data, '<h1>hello</h1>')
    })

    // 使用 mocha 的钩子函数，关闭服务器，否则代码会被阻塞
    after(() => {
        server.close();
    })
})

describe('koa server http test, 钩子中启动服务器 - 钩子关闭服务器', () => {
    let server;
    it('返回 html 代码片段- 钩子启动服务器-钩子关闭服务器', async() => {
        const res = await axios.get('http://localhost:3000');
        assert.strictEqual(res.data, '<h1>hello</h1>')
    })

    // 使用钩子，启动服务器
    before(() => {
        server = app.listen(3000);
    });

    // 使用 mocha 的钩子函数，关闭服务器，否则代码会被阻塞
    after(() => {
        server.close();
    })
})