为什么要分包？
包括无法按需加载以及线上缓存命中率低两个问题， Vite 有默认的拆包策略，但默认的策略也是有缺陷的，比如对第三方包模块无法做进一步的拆包，这就需要我们自定义拆包策略了。

bundle 指的是整体的打包产物，包含 JS 和各种静态资源。
chunk 指的是打包后的 JS 文件，是 bundle 的子集。
vendor 是指第三方包的打包产物，是一种特殊的 chunk。

1.业务代码和 css 代码分割
assets/index-CRrK-oNf.js  
dist/assets/index-uBekmOqc.css

2.第三方库单独打包(react、lodash)
react-vendor-CiW5Bwbg.js (react)
lodash-l0sNRNKZ.js(lodash)

3.将组件库的代码打包
library-2FoFEfuy.js ("antd", "@arco-design/web-react")

4.动态组件(lazy)
index-BhcR-j0C.js
index-DAlNsZSF.css

<!--
manualChunks: {
    // 将 React 相关库打包成单独的 chunk 中
    "react-vendor": ["react", "react-dom"],
    // 将 Lodash 库的代码单独打包
    lodash: ["lodash-es"],
    // 将组件库的代码打包
    library: ["antd", "@arco-design/web-react"],
},
-->

在生产环境下 Vite 完全利用 Rollup 进行构建，因此拆包也是基于 Rollup 来完成的，但 Rollup 本身是一个专注 JS 库打包的工具，对应用构建的能力还尚为欠缺，Vite 正好是补足了 Rollup 应用构建的能力，在拆包能力这一块的扩展就是很好的体现。

如果有进一步拆包的优化空间的，这个时候我们就需要用到 Rollup 中的拆包 API —— manualChunks 了。
