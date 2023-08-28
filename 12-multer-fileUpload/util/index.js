const jsonwebtoken = require('jsonwebtoken');
const secret = 'this is a secret';

const JWT = {
    generate: (data, expires) => {
        // 这里因为用到了 expires , 那么对于 payload 的数据类型需要注意
        // 加密的数据是 string 类型的，如果需要设置 expires，那么需要将 payload 设置为一个包含 data 的对象
        // 加密的数据是 Object 类型的，不需要将 payload 转化为包含 data 的对象
        // return jsonwebtoken.sign(payload, secret, {expiresIn: expires || '10s'});
        
        // 这里为了不报错，就统一处理成 包含data的对象
        return jsonwebtoken.sign({data}, secret, {expiresIn: expires ? expires : '1d'});
    },

    verify: (token) => {
        try{
            return jsonwebtoken.verify(token, secret);
        }catch{
            // jwt expired
            return false
        }
    }
}

module.exports = JWT;