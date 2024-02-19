//  import express from 'express';
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})


function getUserInfo () {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({name: 'copyer', sex: 'man'})
    }, 1000)
  })
}

app.get('/list', (req, res, next) => {
  const list = [
    { id: "1", content: "列表1" },
    { id: "2", content: "列表2" },
  ];
  next();
  res.json({
    list,
    userInfo: req?.userInfo // 返回用户信息，需要通过下个中间件来获取
  })
});

app.use(async (req, res, next) => {
  // mock 异步代码，拿到用户信息
  const data = await getUserInfo();
  console.log(data); // { name: 'copyer', sex: 'man' }
  req.userInfo = data; // 设置用户信息
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

