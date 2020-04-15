const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

router.get('/list', (ctx) => {
  ctx.body = 'hello';
})
// 日志中间件
const logger = async (ctx, next) => {
  await next();
  const { method, url } = ctx.request;
  console.log(`${url} ${method}`);
}

app.use(logger);

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);
