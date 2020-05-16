---
time: 2020-02-14
keyword: WebAssembly
---

# 一、背景介绍

在2019年底，前端迎来了除`HTML`、`CSS`、`Javascript`以外的第四位剑客——`WebAssembly`，随着`WebAssembly`正式被纳入W3C的标准，页面性能成为了前端未来发展的重要方向之一。

# 二、应用场景

## JS的性能救星

> 在普通的业务场景中，JS很少成为前端页面的性能瓶颈，就算是计算量非常大的业务，也往往可以通过业务优化来解决性能问题，但是在Web应用越来越丰富的今天，JS已经不仅仅是担任简单业务执行的角色，比如，JS可以编写loader进行代码打包，也可以编写计算密集型的Web游戏，在`WebAssembly`标准化之前，前端往往可以通过WebGL做GPU加速来解决这部分的性能问题，所以我认为，WebAssembly不适合普通业务开发者，而是适用于通过JS来开发高性能工具的开发者，但是也可以将更多的算法从服务端迁移到浏览器端，减少服务器的压力，比如视频解码等场景。

由于JS是属于**解释型语言**，不同于C语言等**编译型语言**，它属于“边解释边运行”，虽然浏览器引入了`JIT`编译器，使JS性能提升了10倍，但是“边解释边运行”的机制依然让JS的运行效率无法媲美编译成Byte Code的**编译型语言**。而*.wasm文件是体积小且加载快的二进制字节码，可以充分发挥硬件能力，以达到原生执行效率。

## 安全性
 
> WebAssembly 运行在一个沙箱化的执行环境中，甚至可以在现有的 JavaScript 虚拟机中实现。在web环境中，WebAssembly将会严格遵守同源策略以及浏览器安全策略。 ——官网

妈妈再也不用担心JS代码暴露出去的问题了，根据官网介绍，如果不考虑浏览器兼容性，是否可以利用JS与`WebAssembly`的交互能力，将前端加解密算法通过`WebAssembly`实现

## 多端支持
> `WebAssembly`不仅可以运行在浏览器端，还可以应用与非Web环境

WebAssembly在服务端依然有很好的支持，虽然JS在服务端的应用依然不如Java、PHP等老牌语言，但是我觉得可以扩张前端工程师的版图，让前端工程师更好的转型为全栈工程师。

```!
官网提供了更详尽的应用场景列表，[点击跳转](https://www.wasm.com.cn/docs/use-cases/)
```

# 三、使用方法

## 生成*.wasm文件

* 将C/C++通过**Emscripten**编译成`WebAssembly`（官方推荐,环境配置较耗时）
* 通过S-表达式编写*.wat文件，再通过**wat2wasm**工具编译得到*.wasm文件（官方推荐）
* 通过AssemblyScript编译器将Typescript代码编译成`WebAssembly`（对前端工程师友好）


```
;; test.wat文件简单示例
(module
  (func $i (import "imports" "imported_func") (param i32))
  (func (export "exported_func")
    i32.const 42
    call $i
  )
)
```

```!
    具体如何编写官网与MDN都有详细说明
```

## 加载/运行WebAssembly

1. 通过XHR、fetch、arrayBuffer等方式获取*.wasm文件，也可以从indexDB等其他途径获取，在未来计划中可以通过`<script type="module"></script>`引入；
2. 通过`WebAsembly.complie`编译获取到的二进制文件，该函数返回一个`Promise`，resolve一个`WebAssembly.module`；
3. 使用 imports 实例化这个 WebAssembly.Module，获取 exports；

> 以上仅简单概括与复制，[详见官网](https://www.wasm.com.cn/getting-started/js-api/)

# 小结

个人感觉WebAssembly可以带来更丰富的Web应用，拉高Web技术栈的上限，可能会让在线视频剪辑等高性能操作可以在浏览器上得以运行，让我想起了当时很多人对于5G时代的憧憬，app不再需要安装，当你需要使用某个应用的时候像打开Web页面一样打开简单，app将运行在云端，所以我认为WebAssembly在未来一定可以发挥他的特长。

在收集资料的时候也看到了很多开发者对于WebAssembly的质疑，比如当前JS与WebAssembly之间的“桥梁”并不完善，开发成本高，Emscripten工具链只是让C/C++程序员使用等问题，但是我觉得WebAssembly意义重大，可以直接将C/C++的轮子拿过来用就是一个非常好的特点，比如可以将FFmpeg编译成wasm对视频流进行解码，一定可以大幅提升浏览器播放RTSP视频的性能。
