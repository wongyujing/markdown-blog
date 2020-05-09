const Koa = require('koa');
const router = require('./router');
const koaStatic = require('koa-static');
const koaFavicon = require('koa-favicon');

const app = new Koa();

// 日志中间件
const logger = async (ctx, next) => {
  await next();
  const { method, url } = ctx.request;
  console.log(`${url} ${method}`);
}

app.use(logger);

app.use(koaFavicon(__dirname + '/favicon.ico'));

app
  .use(router.routes())
  .use(router.allowedMethods());

app.use(koaStatic(__dirname + '/static'));

app.listen(3000);
