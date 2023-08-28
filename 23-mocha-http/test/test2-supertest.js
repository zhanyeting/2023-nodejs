const { describe, it } = require('mocha');
const supertest = require('supertest');
const app = require('../app');

describe('supertest http server- 自启动关闭', () => {
    let server ;
    it('返回 html 片段 - supertest', async() => {
        await supertest(server).get('/')
        .expect('Content-Type', /text\/html/)
        .expect(200, '<h1>hello</h1>')
    })

    // 使用钩子，启动服务器
    before(() => {
        server = app.listen(3000);
    });

    after(()=> {
        server.close();
    })
})