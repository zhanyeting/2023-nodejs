const express = require('express');

const router = express.Router();

// 路由级别中间件
router.get('/', (req, res) => {
    res.send('home');
});

router.get("/swiper",(req,res)=>{
    res.send("home-swiper")
})

router.get("/slide",(req,res)=>{
    res.send("home-slide")
})

module.exports = router;