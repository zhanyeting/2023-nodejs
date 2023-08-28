const express = require('express');
const app = express();   

// app.METHOD(path, [callback...], callback)
// app 是 express 的一个实例
// METHOD 是一个 HTTP 请求方法， 
// path 是服务器上的路径， 
// callback 是当路由匹配时要执行的函数。
// 路由路径和请求方法一起定义了请求的端点，它可以是字符串、字符串模式或者正则表达式。


/*********   使用 字符串 的路由路径示例    ************ */
app.get('/', (req, res) => {
    // res.write('hello world');
    // res.end();
    
    // res.send('hello world');

    res.send(`
    <html>
        <h1> hello world 你好 </h1>
    </html>
    `);

    // res.send({
    //     ret: 1,
    //     data: [{name: 'tom', age: 100}],
    // });
});

app.get('/login', (req, res) => {
    res.send({
        ok: 1,
        data: {
            username: 'zhangsan',
            password: 123456,
        }
    });
})


/*********   使用 字符串模式 的路由路径    ************ */
// 匹配 acd 和 abcd
app.get('/ab?cd', function(req, res) {
    res.send('ab?cd');
  });
  
  // 匹配 /ab/******
  app.get('/ab/:id', function(req, res) {
    res.send('aaaaaaa');
  });
  
  // 匹配 abcd、abbcd、abbbcd等
  app.get('/ab+cd', function(req, res) {
    res.send('ab+cd');
  });
  
  // 匹配 abcd、abxcd、abRABDOMcd、ab123cd等
  app.get('/ab*cd', function(req, res) {
    res.send('ab*cd');
  });
  
  // 匹配 /abe 和 /abcde
  app.get('/ab(cd)?e', function(req, res) {
   res.send('ab(cd)?e');
  });


/*********   使用 正则表达式 的路由路径    ************ */
// 匹配任何路径中含有 a 的路径：
app.get(/a/, function(req, res) {
    res.send('/a/');
  });
  
// 匹配 butterfly、dragonfly，不匹配 butterflyman、dragonfly man等
app.get(/.*fly$/, function(req, res) {
    res.send('/.*fly$/');
});




/**
 * 可以为请求处理提供多个回调函数，其行为类似 中间件。
 * 唯一的区别是这些回调函数有可能调用 next('route') 方法而略过其他路由回调函数。
 * 可以利用该机制为路由定义前提条件，
 * 如果在现有路径上继续执行没有意义，则可将控制权交给剩下的路径。
 */
// 可以理解 回调函数就是中间件，回调函数可以有多个，也可以写成数组的形式
app.get('/list', (req, res, next) => {
  // token 验证的中间件， cookie验证等
  const isValid = true;
  if (isValid){
    res.name = 'Tom';   // 这里用巧妙的方式将数据传给下一个中间件
    next();   // next表示将执行权交给下一个中间件
  } else {
    // send就表示结束了，不会再接着往下走了
    res.send('error');
  }
}, (req,res,next) => {
  res.send(`Hello ${res.name} , 这是 List 页面!`)
});

// 用数组的方式，简洁
const fun1 = (req, res, next) => {
  // token 验证的中间件， cookie验证等
  const isValid = true;
  if (isValid){
    res.name = 'Jery';   // 这里用巧妙的方式将数据传给下一个中间件
    next();   // next表示将执行权交给下一个中间件
  } else {
    // send就表示结束了，不会再接着往下走了
    res.send('error');
  }
}

const fun2 = (req,res,next) => {
  res.send(`Hello ${res.name} , 这是 List 页面 (数组调用)!`)
}

app.get('/list2', [fun1, fun2] );


app.listen(3000, () => {
    console.log("server start ..........");
})





