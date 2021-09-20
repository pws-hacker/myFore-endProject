/*
 * @Descripttion: 
 * @Author: xudehao
 * @Date: 2021-09-16 15:49:54
 * @LastEditors: xudehao
 */
const express = require('express')
const app = express()
const port = 8888;
var fs = require("fs");


app.listen(port, () => {
  console.log(1111121212)
  console.log(`Example app listening at http://localhost:${port}`)
})

//自动登陆，301重定向，
// app.get("/autologin", function (req, res)  {

//     res.writeHead(301, { 'Location': 'http://localhost:8081/login?username=' + req.query.username + '&pwd=' + req.query.pwd });
//     console.log(res._header);
//     res.end();

// });
console.log(1)
app.get('/login', (req, res) => {
    var resjson = ''
    if (req.query.username == "admin" && req.query.password == "1") {
        resjson = '{"code":1,"msg":"登录成功"}';
    }
    else {
        resjson = '{"code":0,"msg":"用户名密码错误"}';
    }
	res.header("Content-Type", "application/json; charset=utf-8");
    res.end(resjson);
});

// var returnJson = function (req, res) {
//     var filename = req.path.substr(1, req.path.length) + ".json";
//     console.log("try to get filename:" + filename);
//     fs.readFile(filename, function (err, data) {
//         if (err) {
//             res.end("{code:-1,msg:'json不存在'}");
//         }
//         else {
//             res.end(data);
//         }
//     });
// };

// var server = app.listen(8888, function () {
//     console.log(222)
//     var host = server.address().address;
//     var port = server.address().port;
//     console.log("应用实例，访问地址为 http://%s:%s", host, port);
// });

//server.on("request", function (req, res) {//尝试在此处统一添加编码约定
//    //请求的end事件结束之后
//    req.on("end", function () {
//        	res.header("Content-Type", "application/json; charset=utf-8");
//    });
//});