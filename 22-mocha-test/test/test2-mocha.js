const { describe, it } = require('mocha');
const assert = require('assert');
const sum = require('../sum');

/** 
 *   describe  :  一组测试， 可以嵌套
 *   it  :  一个测试
*/

// 大的组
describe("#大的组 hello.js", () => {
    // 小的组1
    describe("#小的组1 sum()", () => {
        // 执行每一个测试用例
        it('sum() should return 0', () => {
            assert.strictEqual(sum(), 0);
        })
        it('sum(1,2,3) should return 6', () => {
            assert.strictEqual(sum(1,2,3), 6);
        })
        // it('sum(1,2,3) should return 9', () => {
        //     assert.strictEqual(sum(1,2,3), 9);  // 出错计算，不会阻塞下面的运行
        // })
    })

    // 小的组2
    describe("#小的组2 sum()", () => {
        // 执行每一个测试用例
        it('sum(1) should return 1', () => {
            assert.strictEqual(sum(1), 1);
        })
        it('sum(1,2) should return 3', () => {
            assert.strictEqual(sum(1,2), 3);
        })
    })
})


