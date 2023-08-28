const assert = require('assert');
const fs = require('fs');
const fsp = fs.promises;
const { describe, it } = require('mocha');

describe('异步测试', () => {
    it('异步读取文件, 结果为 hello', (done) => { 
        fs.readFile('./test/text.txt', 'utf-8', (err, data) => {
            if(err) {
                done(err)
            }else {
                assert.equal(data, 'hello');
                done();
            }
        })
    })
})

describe('异步测试222', () => {
    it('异步读取文件222, 结果为 hello', async() => { 
        const data = await fsp.readFile('./test/text.txt', 'utf-8');
        assert.equal(data, 'hello');
    })
})