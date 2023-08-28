var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  // 首页校验一下 token 

  res.render('upload', { title: 'Express' });
});

module.exports = router;