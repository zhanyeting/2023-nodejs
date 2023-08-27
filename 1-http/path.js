const path = require('path');

console.log(path.join(__dirname, './test', '/aaa/bbbb'));
console.log(path.join(__dirname, 'test', 'aaa/bbbb'));
console.log(path.join(__dirname, '/test', 'aaa/bbbb'));
console.log('\n');
console.log(path.resolve(__dirname, 'test', 'aaa/bbbb'));
console.log(path.resolve(__dirname, './test', '/aaa/bbbb'));
console.log(path.resolve(__dirname, 'test', '/aaa/bbbb'));
console.log(path.resolve(__dirname, '/test', '/aaa/bbbb'));

// G:\BaiduNetdiskDownload\千锋前端高频面试题\nodejs\myNodeProject\23-mocha-http\test\aaa\bbbb
// G:\BaiduNetdiskDownload\千锋前端高频面试题\nodejs\myNodeProject\23-mocha-http\test\aaa\bbbb
// G:\BaiduNetdiskDownload\千锋前端高频面试题\nodejs\myNodeProject\23-mocha-http\test\aaa\bbbb

// G:\BaiduNetdiskDownload\千锋前端高频面试题\nodejs\myNodeProject\23-mocha-http\test\aaa\bbbb
// G:\aaa\bbbb
// G:\aaa\bbbb
// G:\aaa\bbbb