const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    // res.send({list: [111, 222, 333]});

    // 这里请求到 list 数据后，将数据传给 home 页面
    res.render('home', {
        list: [111,222,333,444],
        myhtml: `<b> 我是加粗 </b>`
    });
});

module.exports = router;