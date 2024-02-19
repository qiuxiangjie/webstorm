const Koa = require('koa');
const app = new Koa();

// 中间件1
app.use(async (ctx, next) => {
  console.log('1. Enter Middleware 1');
  await next(); // 控制流进入下一个中间件
  console.log('6. Leave Middleware 1');
});

// 中间件2
app.use(async (ctx, next) => {
  console.log('2. Enter Middleware 2');
  await next(); // 控制流进入下一个中间件
  console.log('5. Leave Middleware 2');
});

// 中间件3
app.use(async (ctx) => {
  console.log('3. Enter Middleware 3');
  ctx.body = 'Hello, Koa!'; // 最内层中间件设置响应内容
  console.log('4. Leave Middleware 3');
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});