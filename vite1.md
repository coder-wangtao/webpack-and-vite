1.无模块化标准阶段
1.1 文件划分
文件划分方式是最原始的模块化实现，简单来说就是将应用的状态和逻辑分散到不同的文件中，然后通过 HTML 中的 script 来一一引入。
1.2 命名空间

<!-- window.moduleA = {
        data: "moduleA",
        method: function () {
            console.log("execute A's method");
        }
    };
-->
<!-- window.moduleB = {
        data: "moduleB",
        method: function () {
            console.log("execute B's method");
        },
    };
-->

1.3 IIFE(立即执行函数)

2.前端的模块化规范统一也经历了漫长的发展阶段，即便是到现在也没有实现完全的统一。接下来，我们就来熟悉一下业界主流的三大模块规范: CommonJS 、 AMD 和 ES Module。
2.1 CommonJS
对于模块规范而言，一般会包含 2 方面内容: 1.统一的模块化代码规范；2.实现自动加载模块的加载器(也称 loader )

<!--
var data = "hello world";
function getData() {
    return data;
}
module.exports = {
    getData,
};
const { getData } = require("./module-a.js");
console.log(getData())
-->

代码中使用 require 来导入一个模块，用 module.exports 来导出一个模块。实际上 Node.js 内部会有相应的 loader 转译模块代码，最后模块代码会被处理成下面这样:

<!--
(function (exports, require, module, **filename, **dirname) {
// 执行模块代码
// 返回 exports 对象
}); -->

对 CommonJS 而言，一方面它定义了一套完整的模块化代码规范，另一方面 Node.js 为之实现了自动加载模块的 loader ,看上去是一个很不错的模块规范，但也存在一些问
题:
模块加载器由 Node.js 提供，依赖了 Node.js 本身的功能实现，比如文件系统，如果 CommonJS 模块直接放到浏览器中是无法执行的。当然, 业界也产生了 browserify 这种打包工具来支持打包 CommonJS 模块，从而顺利在浏览器中执行，相当于社区实现了一个第三方的 loader。CommonJS 本身约定以同步的方式进行模块加载，这种加载机制放在服务端是没问题的，一来模块都在本地，不需要进行网络 IO，二来只有服务启动时才会加载模块，而服务通常启动后会一直运行，所以对服务的性能并没有太大的影响。但如果这种加载机制放到浏览器端，会带来明显的性能问题。它会产生大量同步的模块请求，浏览器要等待响应返回后才能继续解析模块。也就是说，模块请求会造成浏览器 JS 解析过程的阻塞，导致页面加载速度缓慢。
总之，CommonJS 是一个不太适合在浏览器中运行的模块规范。因此，业界也设计出了全新的规范来作为浏览器端的模块标准，最知名的要数 AMD 了。
2.2 AMD 规范
AMD 全称为 Asynchronous Module Definition ，即异步模块定义规范。模块根据这个规范，在浏览器环境中会被异步加载，而不会像 CommonJS 规范进行同步加载，也就不会产生同步请求导致的浏览器解析过程阻塞的问题了。我们先来看看这个模块规范是如何来使用的:

<!-- // main.js
    define(["./print"], function (printModule) {
        printModule.print("main");
    });
    // print.js
    define(function () {
        return {
            print: function (msg) {
                console.log("print " + msg);
            },
        };
    });
-->

不过 AMD 规范使用起来稍显复杂，代码阅读和书写都比较困难。因此，这个规范并不能成为前端模块化的终极解决方案，仅仅是社区中提出的一个妥协性的方案，同期出现的规范当中也有 CMD 规范，这个规范是由淘宝出品的 SeaJS 实现的，解决的问题和 AMD 一样。不过随着社区的不断发展，SeaJS 已经被 requireJS 兼容了。当然，你可能也听说过 UMD (Universal Module Definition)规范，其实它并不算一个新的规范，只是兼容 AMD 和 CommonJS 的一个模块化方案，可以同时运行在浏览器和 Node.js 环境。顺便提一句，后面将要介绍的 ES Module 也具备这种跨平台的能力。
2.3 ES6 Module
ES6 Module 也被称作 ES Module (或 ESM )， 是由 ECMAScript 官方提出的模块化规范，作为一个官方提出的规范， ES Module 已经得到了现代浏览器的内置支持。在现代浏览器中，如果在 HTML 中加入含有 type="module" 属性的 script 标签，那么浏览器会按照 ES Module 规范来进行依赖加载和模块解析，这也是 Vite 在开发阶段实现 no-bundle 的原因，由于模块加载的任务交给了浏览器，即使不打包也可以顺利运行模块代码。不仅如此，一直以 CommonJS 作为模块标准的 Node.js 也紧跟 ES Module 的发展步伐，从 12.20 版本开始正式支持原生 ES Module。也就是说，如今 ES Module 能够同时在浏览器与 Node.js 环境中执行，拥有天然的跨平台能力。

3.vite 和 webpack 比较
你应该知道了 Vite 所倡导的 no-bundle 理念的真正含义: 利用浏览器原生 ES 模块的支持，实现开发阶段的 Dev Server，进行模块的按需加载，而不是先整体打包再进行加载。相比 Webpack 这种必须打包再加载的传统构建模式，Vite 在开发阶段省略了繁琐且耗时的打包过程，这也是它为什么快的一个重要原因。

4.Vite 会将项目的源代码编译成浏览器可以识别的代码，与此同时，一个 import 语句即代表了一个 HTTP 请求。Vite Dev Server 会读取本地文件，返回浏览器可以解析的代码。当浏览器解析到新的 import 语句，又会发出新的请求，以此类推，直到所有的资源都加载完成。

5.在开发阶段 Vite 通过 Dev Server 实现了不打包的特性，而在生产环境中，Vite 依然会基于Rollup 进行打包，并采取一系列的打包优化手段。