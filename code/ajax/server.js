const express = require("express");

// 创建 express 对象
const app = express();

// 创建路由规则
app.get("/server", (request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.send("hello EXPRESS ha!")
});

// 创建路由规则
app.post("/json-server", (request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Headers", "*");
  let obj = {
    name: 'xiaoming',
    age: 25
  }
  response.send(JSON.stringify(obj));
});

// 创建路由规则
app.post("/ie-server", (request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Headers", "*");
  response.send("测试 IE 缓存问题 - 5");
});

// 创建路由规则
app.get("/timeout-error-server", (request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Headers", "*");
  setTimeout(function () {
    response.send("测试超时");
  }, 1500);
});

// 监听端口启动服务
app.listen("8000", () => {
  console.log("服务已经启动， 8000 端口监听中....")
});
