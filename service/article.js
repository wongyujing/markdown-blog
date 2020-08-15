const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const MarkdownIt = require('markdown-it');
const meta = require('markdown-it-meta');

module.exports.getList = function() {
  const indexPath = path.resolve(__dirname, '../views/templates/index.ejs');
  const contentPath = path.resolve(__dirname, '../content');
  const html = fs.readFileSync(indexPath, {
    encoding: 'utf-8'
  });
  const markdownList = fs.readdirSync(contentPath, {
    encoding: 'utf-8'
  });
  return ejs.render(html,
  {list: markdownList.map(item => item.replace(/.md/, ''))},
  {filename: indexPath}
  );
}

module.exports.getContent = function(name) {
  const encoding = { encoding: 'utf-8' };
  const content = fs.readFileSync(
      path.resolve(__dirname, `../content/${name}.md`),
      encoding
  );
  const md = new MarkdownIt();
  md.use(meta);
  const htmlStr = md.render(content);
  const html = fs.readFileSync(
      path.resolve(__dirname, '../views/templates/detail.ejs'),
      encoding
  );
  console.log(md.meta);
  const info = md.meta;
  return ejs.render(html,
  {content: htmlStr, title: name, ...info},
  {filename: path.resolve(__dirname, '../views/templates/detail.ejs')}
  );
}

module.exports.getDataList = function() {
  const contentPath = path.resolve(__dirname, '../content');
  const markdownList = fs.readdirSync(contentPath, {
    encoding: 'utf-8'
  });
  return markdownList.map(article => article.replace(/.md/, ''));
}
