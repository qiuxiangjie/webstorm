
const Koa  = require('koa')
const app = new Koa()
const bodyparser = require('koa-bodyparser')
const Router = require('koa-router')
const router = Router({ prefix: '/api' })
 

app.keys = ['some secret', 'another secret'];
function getUserInfo() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ name: "copyer", sex: "man" });
    }, 1000);
  });
}

const goods = [
  { id: 1, text: "我是商品1", price: 1000 },
  { id: 2, text: "我是商品2", price: 2000 },
];


router.get('/list', async (ctx, next) => {
    await next()
    ctx.body = {
        code: 200,
        data: goods,
        userInfo: ctx?.userInfo
    }
})

router.get('/detail', ctx => {
    ctx.body = {
        code: 200,
        data: goods.find(item => goods.id === ctx.query.i)
    }
})


router.post('/login', ctx => {
    const user = ctx.request.body;
    if (user.userName === 'admin' && user.password === '123') {
        const token = 'a mock token';
        ctx.cookies.set('token', token);
        ctx.body = {
            code: 200,
            data: {
             token  
            }
        
        }
    } else {
        ctx.body = {
            code: 401,
            msg: '登录失败！'
        }
    }
   
})
router.use(async (ctx, next) => {

  const res = await getUserInfo();
  console.log(res); // { name: 'copyer', sex: 'man' }
  ctx.userInfo = res; // 设置用户信息
});


// 解析post数据并注册路由
app.use(bodyparser());
app.use(router.routes());
const port = 8866;
app.listen(port, () => {
    console.log(`node 服务器启动完成！端口：${port}`)
})