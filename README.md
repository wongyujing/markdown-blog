# 基于markdown的博客系统

---

## 前言

原博客系统的文章保存在`MySQL`服务中，但是在服务器到期之后的迁移工作就会变得比较麻烦，所以本项目旨在将文章静态化，将文章通过`markdown`的形式保存在GitHub中，然后通过`Koa`来完成文章的爬取工作，这样就节约了维护`MySQL`的成本，部署将更加方便

---

## 项目运行

* 开发环境

```shell
  npm run build
```


