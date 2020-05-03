const fs = require('fs');
const path = require('path');
const Router = require('koa-router');
const ejs = require('ejs');

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
})

module.exports = router;
