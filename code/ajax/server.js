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

// 测试 jQuery
app.all("/jq-server", (request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Headers", "*");
  let obj = { name: 'testName', age: 24 }
  response.send(JSON.stringify(obj));
});

// 测试 axios
app.all("/axios-server", (request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Headers", "*");
  let obj = { name: 'axios server', age: 24 }
  response.send(JSON.stringify(obj));
});


// 测试 jsonp
app.all("/jsonp-server", (request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Headers", "*");
  let obj;
  if (request.query.name === 'Joey') {
    obj = {desc: '用户名已注册', code: 500};
  } else {
    obj = {desc: '用户名可以使用', code: 200};
  }
  // 需要转成 string 传入才可以
  response.send(`handleCallback(${JSON.stringify(obj)})`);
  // response.send(`handleCallback(${obj})`);
});

// 测试 jsonp
app.all("/jq-jsonp-server", (request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Headers", "*");
  let obj;
  if (request.query.name === 'Joey') {
    obj = {desc: '用户名已注册', code: 500};
  } else {
    obj = {desc: '用户名可以使用', code: 200};
  }
  // 需要转成 string 传入才可以
  response.send(`${request.query.callback}(${JSON.stringify(obj)})`);
  // response.send(`handleCallback(${obj})`);
});

// 监听端口启动服务
app.listen("8000", () => {
  console.log("服务已经启动， 8000 端口监听中....")
});
