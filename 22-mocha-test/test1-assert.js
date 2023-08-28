/**
 * nodeJs 自带的断言库
 *     使用 node 自带的 assert 命令，
 *          如果出错后，会直接报出错误，不会再往下走了
 *          如果没有问题，也不会有任何提示信息，控制台不打印东西，容易让人琢磨不透
 *        
 *     接了来，引出了 mocha【摩卡】这个插件  
 *      --- 代码见 ./test/test2.js ，需要配合 npm test 命令使用，因为 mocha 命令无法单独使用
 */ 
const assert = require('assert');
const sum = require('./sum');

// assert.strictEqual(sum(), 10);   // 会报错
assert.strictEqual(sum(), 0);
assert.strictEqual(sum(1), 1);
assert.strictEqual(sum(1,2,3), 6);
