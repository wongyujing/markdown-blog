# 前言
---
如今，前端工程化越来越成熟，也涌现出越来越多的高效工具让开发变得简单，我们可以更加专注于业务层面，我们可以通过脚手架轻松搭建一个功能完善的React开发环境，但是在这样的“方便”下，我们越来越忽视了Webpack和babel的重要性，本文只是记录通过Webpack和Babel搭建一个简单的React环境，并不涉及理论知识与运行机制。

掘金地址：https://juejin.im/post/5e4ea8b36fb9a07cd614ce4a

# 工具
* webpack 4.x
* babel 7.x
* react 16.x
* node 10.x
* npm 6.x

# 开始

## 一、初始化npm环境

```shell
mkdir react-app & cd react-app
npm init
```
初始化npm环境时会提示输入项目信息，按需输入即可，初始化成功之后项目目录下会生成一个`package.json`和`node_modules/`文件夹，`package.json`为npm的配置文件，里面包含了项目信息，依赖项和其他重要信息，`node_modules/`下存放项目的依赖文件。

## 二、webpack安装与配置

首先需要安装`webpack`，现在已经更新到4.x，4.x的特性为约定大于配置，省去了很多冗余的配置项，我们简单配置几行代码就可以完成项目的打包。

```shell
npm install webpack --save-dev
// 或简写
npm i webpack -D
```
安装完毕之后我们的项目下已经可以使用`webpack`命令进行打包了，不过首先需要对`webpack`进行简单配置。  

在项目目录下新建`webpack.config.js`  

```javascript
// webpack.config.js
module.exports = {
    // mode有两个值，development和production，mode决定了webpack的构建方式
    mode: 'development'
}

```


```!
此处对象的导出不可以使用es6的exports或export default，因为webpack基于node进行构建，node原生应用的是CommonJS的模块规范
```

我们在没有定义`entry`的情况下，webpack会默认读取`/src/index.js`，所以我们需要在项目中新建`src`目录，并在`src`下新建`index.js`文件，这个`index.js`就是我们项目的入口文件了。  

```javascript
// index.js
// 先随便写点什么
console.log("HelloWorld")
```

这个时候先进行一次简单的打包，在控制台运行webpack命令

```shell
webpack ./webpack.config.js
```
等待命令执行完毕，发现项目出现了一个`dist/`文件夹，下面有一个main.js，这个就是我们打包产生的文件，在webpack.config.js中如果没有配置`output`，则默认会在项目的根目录下生成`dist/`目录，打包产物名为`main.js`。   

为了方便，可以在package.json中配置命令

```javascript
// package.json
 "scripts": {
    "build": "webpack ./webpack.config.js"
  }
```
这样就可以通过`npm run build`快速调用`webpack ./webpack.config.js`。

## 三、webpack开发环境配置

如果我们在开发过程中，每改一次代码都需要重新打包的话，会大大的影响我们的效率，所以`webpack`提供了一个本地开发服务工具——`webpack-dev-server`，可以本地搭建一个web服务器，将打包生成的产物加载到内存中，读写速度更快，并且支持热更新等提升效率的功能。   

首先安装`webpack-dev-server`

```shell
npm install webpack-dev-server --save-dev
```
在`package.json`中添加命令

```javascript
  "scripts": {
    "dev": "webpack-dev-server --open --compress --hot --host 127.0.0.1 --port 8080"
  },
```
> `webpack-dev-server`更详细的配置可以在`webpack.config.js`的`devServer`中进行配置。

在控制台中运行

```
npm run dev
```

通过浏览器打开`http://127.0.0.1:8080/main.js`，就可以看到打包的生成物`main.js`。


```!
这个时候打开的main.js并不是前面dist/下的main.js，其实webpack为了更好的开发效率，将打包生成物main.js存放在了计算机内存中，加载速度比放在磁盘中更快。
```
内存中有了`main.js`后，就需要一个内存中的`html`对他进行加载，这个时候需要`html-webpack-plugin`

首先项目中新建`index.html`

安装`html-webpack-plugin`

```shell
npm install html-webpack-plugin --save-dev
```
在`webpack.config.js`中进行简单配置

```javascript
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 引入html-webpack-plugin

module.exports = {
  mode: 'development',
  // webpack插件配置
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './index.html') // 用path模块将相对路径转换成绝对路径
    })
  ]
}
```

> 2020-02-24更新，查阅资料为什么`node`中一定要使用`path`模块进行处理路径（为什么不使用相对路径），因为`node`在运行`js`过程中，代码中的相对路径并不可靠，相对路径会根据当前的`process`路径进行解析，所以需要转换为**绝对路径**。

重新运行`npm run dev`，在浏览器打开`http://127.0.0.1:8080`，可以看到页面被渲染，并自动将`main.js`挂载在了页面中。

## 四、React环境配置

### 1. 安装`react`和`react-dom`

```shell
npm install react react-dom --save
```
> `react`为React的核心库，用于构建Virtual Dom以及实现MVVM模型   
`react-dom`主要负责将Virtual Dom转换成dom对象

### 2. 在`/src/index.js`撰写React代码

```javascript
import React from 'react';
import ReactDom from 'react-dom'

// create by React element
const div = React.createElement(
  'button',
  {
    onClick: () => alert('Hello World')
  },
  'hello'
)

ReactDom.render(div, document.getElementById("app"));
```

在`index.html`中添加`id`为`app`的`div`


```html
<body>
    <div id="app"></div>
</body>
```

重新运行`npm run dev`

页面已经成功渲染出React元素

### 3. 使用JSX

使用`React.createElement()`可以通过JS对象的形式构建出`Virsual Dom`，但是却大大的降低了代码的可读性，通过`JSX`可以这样写React元素


```javascript
const div = <div>Hello World</div>
```

JSX可以将编写的html格式转译成React.createElement()创建，可以在Babel官网进行验证

![](https://user-gold-cdn.xitu.io/2020/2/23/17070f91852e9525?w=2296&h=218&f=png&s=51065)

在`webpack`中配置`Babel`即可达到效果，Babel官网提供了React环境的[配置教程](https://www.babeljs.cn/docs/babel-preset-react)

安装`babel-loader` `@babel/preset-react` `@babel/core`

```shell
npm install babel-loader @babel/core @babel-react --save-dev
```
在`webpack.config.js`中进行模块配置

```javascript
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /.js|.jsx$/, // 正则匹配.js和.jsx文件用babel-loader进行处理
        use: 'babel-loader',
        exclude: /node_modules/ // 不处理node_modules/文件夹下的文件
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './index.html')
    })
  ]
}
```
再添加`babel`配置文件

在项目根目录下添加`.babelrc.json`或是`babel.config.json`


```json
{
  "presets": [
    [
      "@babel/preset-react"
    ]
  ]
}
```

关于babel的学习，有一篇文章很好的文章，[点击跳转](https://zhuanlan.zhihu.com/p/43249121)

修改`react`代码


```javascript
import React from 'react';
import ReactDom from 'react-dom'

// create by jsx
const div = <button onClick={() => console.log(1111)}>Hello</button>

ReactDom.render(div, document.getElementById("app"));
```

重新运行`npm run dev`

成功集成JSX！！！

# 小结

`webpack`在前端工程化中起到非常重要的作用，前端“**现代化**”项目基本已经离不开`webpack`了，所以我希望自己可以进一步的去探索`webpack`的奥秘，了解它究竟是如何实现这一切高能的操作，化“神奇”为“知识”，也希望自己不要以学习轮子为唯一目标，这样路只会越走越窄。PS：结尾真的好难写。。。😫
