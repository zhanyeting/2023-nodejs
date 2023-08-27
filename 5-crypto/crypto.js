const crypto = require('crypto');

/******     md5    ***************/
/* const hash = crypto.createHash('md5');
// 可任意多次调用update():
hash.update("123 hello 你好");   // 默认字符串编码为UTF-8
// console.log(hash.digest('hex'));   // 16进制  689a812486f27571cc93d2a4dec1d39f
console.log(hash.digest('base64'));   // base64  aJqBJIbydXHMk9Kk3sHTnw==
 */

/******     sha1    ***************/
const hash = crypto.createHash('sha1');
// 可任意多次调用update():
hash.update("123 hello 你好");
// hash.update('Hello, nodejs!');
console.log(hash.digest('hex'));    // 16进制  ced3a83016b484153b831936426187262231e33c
// console.log(hash.digest('base64')); // base64 ztOoMBa0hBU7gxk2QmGHJiIx4zw=


/******     sha256    ***************/
// 只要密钥发生了变化，那么同样的输入数据也会得到不同的签名，因此，可以把Hmac理解为用随机数“增强”的哈希算法。
const hmac = crypto.createHmac('sha256', 'secret-key');  // Hmac 需要一个密钥
hmac.update('Hello, world!');
hmac.update('Hello, nodejs!');

console.log(hmac.digest('hex'));  // 80f7e22570bed1fa3ef683edce5d0890e268e1ca8d1bd0c382bc766f3744be9f


/******     AES    ***************/
// AES是一种常用的对称加密算法，加解密都用同一个密钥。
// crypto模块提供了AES支持，但是需要自己封装好函数，便于使用：
function encrypt(key, iv, data){
    const aesCipher = crypto.createCipheriv('aes-128-cbc', key, iv);
    const encrypter = aesCipher.update(data, 'binary', 'hex') + decipher.final('hex');
    console.log("加密后的结果 === ", encrypter);
    return encrypter;
}

function decrypt(key, iv, encrypter) {
    encrypter = Buffer.from(encrypter, 'hex').toString('binary');
    const aesDecipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
    const decrypter = aesDecipher.update(encrypter, 'binary', 'utf-8') + aesDecipher.final('utf-8');
    console.log("解密出的结果 ==== ", decrypter);
    return decrypter;
}

function encrypt2 (key, iv, data) {
    let decipher = crypto.createCipheriv('aes-128-cbc', key, iv);
    // decipher.setAutoPadding(true);
    return decipher.update(data, 'binary', 'hex') + decipher.final('hex');
}

function decrypt2 (key, iv, crypted) {
     crypted = Buffer.from(crypted, 'hex').toString('binary');
     let decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
     return decipher.update(crypted, 'binary', 'utf8') + decipher.final('utf8');
}

const data = 'hello world 12345 你好！';
const key = 'abcdef1234567890';
const iv = 'abcdef1234567890';
const encryptData = encrypt(data, key, iv);
// decrypt(encryptData);

