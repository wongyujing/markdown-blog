const Router = require('koa-router');
const article = require('../service/article');

const router = new Router();

router.get('/', ctx => {
  ctx.body = article.getList();
});

router.get('/:name', ctx => {
  const { name } = ctx.params;
  ctx.body = article.getContent(name);
})

module.exports = router;
