const fs = require('fs');
const path = require('path');
const Router = require('koa-router');
const ejs = require('ejs');
const MarkdownIt = require('markdown-it');
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
