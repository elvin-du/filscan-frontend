/*
* @Author: yishuai
* @Date:   2019-04-21 09:57:53
* @Last Modified by:   yishuai
* @Last Modified time: 2019-04-21 12:22:22
*/
const Koa = require('koa')
const Router = require('koa-router') // 引入路由
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = new Koa()
    const router = new Router() // 定义路由
    



  // 设置路由，与next.js的路由进行映射
  router.get('/message:cid', async (ctx) => {
  // handle传入的第三个参数跟我们next.js中用Router.push({})传入的数组一样
    await handle(ctx.req, ctx.res, {
      pathname: '/message',
      query: {
        cid
      }
    })
    ctx.respond = false
  })
    
router.get('*', (req, res) => {
    return handle(req, res)
  })

// 使用路由
  server.use(router.routes())
  server.use(async (ctx, next) => {
    await handle(ctx.req, ctx.res)
    ctx.respond = false
  })

  server.listen(3003, () => {
    console.log('server is running at http://localhost:3003')
  })
})