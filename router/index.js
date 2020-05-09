const fs = require('fs');
const path = require('path');
const Router = require('koa-router');
const ejs = require('ejs');
const MarkdownIt = require('markdown-it');

const router = new Router();

router.get('/', ctx => {
  const html = fs.readFileSync(path.resolve(__dirname, '../views/templates/index.ejs'), {
    encoding: 'utf-8'
  });
  const markdownList = fs.readdirSync(path.resolve(__dirname, '../content'), {
    encoding: 'utf-8'
  });
  ctx.body = ejs.render(html,
  {list: markdownList.map(item => item.replace(/.md/, ''))},
  {filename: path.resolve(__dirname, '../views/templates/index.ejs')}
  );
});

router.get('/:name', ctx => {
  const { name } = ctx.params;
  const encoding = { encoding: 'utf-8' };
  const content = fs.readFileSync(
    path.resolve(__dirname, `../content/${name}.md`),
    encoding
  );
  const md = new MarkdownIt();
  const htmlStr = md.render(content);
  const html = fs.readFileSync(
    path.resolve(__dirname, '../views/templates/detail.ejs'),
    encoding
  );
  ctx.body = ejs.render(html,
      {content: htmlStr, title: name},
      {filename: path.resolve(__dirname, '../views/templates/detail.ejs')}
  );
})

module.exports = router;
