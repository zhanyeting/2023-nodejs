const express = require('express');
const router = express.Router();

const userList = [
    {id: 1, username: 'admin', password: '123456'},
    {id: 2, username: 'zhangsan', password: '123'},
    {id: 3, username: 'lisi', password: '123'},
    {id: 4, username: 'aaa', password: '123'},
    {id: 5, username: 'bbb', password: '123'},
]

router.get('/', (req, res) => {
    res.render('login')
})

router.post('/', (req, res) => {
    // console.log(req?.body);
    const { username, password } = req?.body || {};

    // 简单点，这里就不走数据库了
    const user = userList.find(it => (it.username === username && it.password === password))
    if (user) {
        res.send({ok: 1, data: user});
    } else {
        res.send({ok: 0, data: null});
    }
});


module.exports = router;