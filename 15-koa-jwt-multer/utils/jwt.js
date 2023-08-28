const jsonwebtoken = require('jsonwebtoken');
const secret = "this is token secret";

const JWT = {
    generate: (payload, expires) => {
        return jsonwebtoken.sign({data: payload}, secret, {expiresIn: '1d'})
    },

    verify: (token) => {
        try {
            return jsonwebtoken.verify(token, secret);
        } catch {
            return false;
        }
    }
}

module.exports = JWT;