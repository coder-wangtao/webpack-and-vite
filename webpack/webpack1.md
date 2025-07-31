<!--
const obj = {};
//定义属性
Object.defineProperty(obj, Symbol.toStringTag, { value: "Module" });
//查看自定义类型
console.log(Object.prototype.toString.call(obj)); //'[object Module]'改变了类型为Module
-->

在 Webpack 中常用的代码分割方式有哪些？
Webpack 中懒加载的原理是什么？

在 Webpack 搭建的项目中，如何达到懒加载的效果？
懒加载的本质实际上就是代码分离。把代码分离到不同的 bundle 中，然后按需加载或并行加载这些文件。

在 Webpack 中常用的代码分割方式有哪些？
//1.入口起点：使用 entry 配置手动地分离代码。
//2.防止重复：使用 Entry dependencies(使用 dependOn 选项你可以与另一个入口 chunk 共享模块) 或者 SplitChunksPlugin 去重和分离 chunk。

<!--
module.exports = {
  //...
  entry: {
    app: { import: './app.js', dependOn: 'react-vendors' },
    'react-vendors': ['react', 'react-dom', 'prop-types'],
  },
};
-->

//3.动态导入：通过模块的内联函数调用来分离代码。
