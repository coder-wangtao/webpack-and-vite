// 1.Loader 的本质是什么？
// Loader 本质上是函数。它接收资源文件或者上一个 Loader 产生的结果作为入参，最终输出转换后的结果。
/**
 *
 * @param {string|Buffer} content 源文件的内容
 * @param {object} [map] 可以被 https://github.com/mozilla/source-map 使用的 SourceMap 数据
 * @param {any} [meta] meta 数据，可以是任何内容
 */
function webpackLoader(content, map, meta) {
  console.log("我是 webpackLoader");
  return content;
}
module.exports = webpackLoader;

//2.在 Webpack 中如何使用自定义 Loader？有几种方式？
//2.1.配置 Loader 的绝对路径
{
    test: /\.js$/,
    use: [
        {
        loader: path.resolve(__dirname, "./loaders/simpleLoader.js"),
        options: {
            /* ... */
        },
        },
    ],
}
//2.2.配置 resolveLoader.alias 配置别名
resolveLoader: {
    alias: {
        "simpleLoader": path.resolve(__dirname, "./loaders/simpleLoader.js"),
    },
}
//2.3.配置 resolveLoader.modules
resolveLoader: {
    //找loader的时候，先去loaders目录下找，找不到再去node_modules下面找
    modules: ["loaders", "node_modules"],
}
//2.4.如果要使用第三方 Loader，直接配置 Loader 名即可，默认会在node_modules下查找。

//3.Loader 的类型有哪几种？它们的运行顺序是怎么样的？如何控制它们的运行顺序？
//Loader 按类型分可以分为四种：前置(pre)、普通(normal)、行内(inline)、后置(post)。
//Loader 的类型和它本身没有任何关系，而是和配置的 enforce属性有关系。
//loader chain（链）的时候提到过 Loader 的执行顺序是由右向左，或者由下到上执行。
//其实这种说法的并不准确，在这里我引用官方的说法所有一个接一个地进入的 Loader，都有两个阶段：
// 3.1.Pitching 阶段: Loader 上的 pitch 方法，按照 后置(post)、行内(inline)、普通(normal)、前置(pre) 的顺序调用。
// 3.2.Normal 阶段: Loader 上的 常规方法，按照 前置(pre)、普通(normal)、行内(inline)、后置(post) 的顺序调用。模块源码的转换， 发生在这个阶段。
// 3.3.同等类型下的 Loader 执行顺序才是由右向左，或者由下到上执行。

// 4.什么是 Normal Loader？什么是 Pitching Loader？它们的运行机制有什么不同？
//4.1 Normal Loader(就是一个函数)
function ALoader(content, map, meta) {
  console.log("执行 a-loader 的normal阶段");
  return content + "//给你加点注释(来自于Aloader)";
}
module.exports = ALoader;
//4.2 Pitching Loader(其实我们在导出的 Loader 函数上还有一个可选属性：pitch。它的值也是一个函数，该函数就被称为 Pitching Loader)
function ALoader(content, map, meta) {
  console.log("执行 a-loader 的normal阶段");
  return content + "//给你加点注释(来自于Aloader)";
}

ALoader.pitch = function () {
  console.log("ALoader的pitch阶段");
};

module.exports = ALoader;
//4.3 在 Loader 的运行过程中，如果发现该 Loader 上有pitch属性，会先执行 pitch 阶段，再执行 normal 阶段。
//4.5假如现在我们的 rule 配置是这样：
{
    test: /\.js$/,
    use: [
      {
        loader: "a-loader",
        enforce: "pre",
      },
      {
        loader: "b-loader",
        enforce: "post",
      },
      {
        loader: "c-loader",
        enforce: "pre",
      },
      {
        loader: "d-loader",
        enforce: "post",
      },
      {
        loader: "e-loader",
        enforce: "normal",
      },
      {
        loader: "f-loader",
        enforce: "normal",
      },
    ]
}
// 这些 loader 的执行顺序是什么样的？
//4.5.1Webpack 内部先会对 loader 的类型进行分类，先找出各个类型的 loader，比如该例子：
// post类型loader
const postLoaders = ["b-loader", "d-loader"];
// inline类型loader
const inlineLoaders = [];
// normal类型loader
const normalLoaders = ["e-loader", "f-loader"];
// pre类型loader
const preLoaders = ["a-loader", "c-loader"];
// 4.5.2.找出所有类型的 loader 之后进行合并：
let loaders = [
  ...postLoaders,
  ...inlineLoaders,
  ...normalLoaders,
  ...preLoaders,
];
// 结果为: ['b-loader', 'd-loader', 'e-loader', 'f-loader', 'a-loader', 'c-loader']
// 这个时候再去理解它的执行顺序就是：
// b-loader 的 pitch 阶段 -> 
// d-loader 的 pitch 阶段 -> 
// e-loader 的 pitch 阶段 -> 
// f-loader 的 pitch 阶段 -> 
// a-loader 的 pitch 阶段 -> 
// c-loader 的 pitch 阶段 -> 
// c-loader 的 normal 阶段 -> 
// a-loader 的 normal 阶段 ->
// f-loader 的 normal 阶段 -> 
// e-loader 的 normal 阶段 ->
// d-loader 的 normal 阶段 -> 
// b-loader 的 normal 阶段 ->

// 5.如果一个文件指定了多个 Loader，如何控制使得只执行特定的 Loader，忽略其他的 Loader?
// 在某些情况下，我们对一个类型的文件配置了多个 Loader，但只想执行特定的 Loader 怎么办？比如只想执行内联类型的 CLoader。
function ALoader(content, map, meta) {
  console.log("执行 a-loader 的normal阶段");
  return content + "//给你加点注释(来自于Aloader)";
}
ALoader.pitch = function () {
  console.log("ALoader的pitch阶段");
};
module.exports = ALoader;

function BLoader(content, map, meta) {
  console.log("执行 b-loader 的normal阶段");
  return content + "//给你加点注释(来自于BLoader)";
}
BLoader.pitch = function () {
  console.log("BLoader的pitch阶段");
};
module.exports = BLoader;

function CLoader(content, map, meta) {
  console.log("执行 c-loader 的normal阶段");
  return content + "//给你加点注释(来自于CLoader)";
}
CLoader.pitch = function () {
  console.log("CLoader的pitch阶段");
};
module.exports = CLoader;

import test from "!c-loader!./test.js";
// 此时 Loader 的执行顺序就变成了（忽略掉了 normal类型的 ALoader）：

import test from "!!c-loader!./test.js";
//使用 !! 前缀，将禁用其他类型的loader，只要内联loader

import test from "-!c-loader!./test.js";
// 使用 -! 前缀，将禁用所有已配置的 preLoader 和 loader，但是不禁用 postLoaders，也就是不要 pre 和 normal loader：


// 6.Loader 为什么是自右向左执行的？如何做到的？
// 7.项目中对.css、.less、.scss、.tsx、.vue等文件是如何做解析的？它们的原理是什么？
// 8.Webpack 中完整的 Loader 运行机制是怎么样的？
// 9.为什么最后的 Loader 处理结果必须是JS类型的字符串？
// 10.给你个需求：需要在打包过程中移除console.log函数，你会通过哪种方式进行处理？是通过 Loader 还是 Babel Plugin？再或者是 Webpack Plugin？给出你的理由
