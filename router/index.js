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

router.get('/api/getArticleList', ctx => {
  ctx.body = article.getDataList();
})

module.exports = router;
