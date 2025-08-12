1.rollup

2.rollup 配置
2.1Rollup 基本配置项:rollup.config.js
2.2JavaScript API 的使用：两个经典的 API: rollup.rollup 和 rollup.watch

3.rollup 的插件机制
3.1Rollup 的打包过程中，会定义一套完整的构建生命周期，从开始打包到产物输出，中途会经历一些标志性的阶段，并且在不同阶段会自动执行对应的插件钩子函数(Hook)。对
Rollup 插件来讲，最重要的部分是钩子函数，一方面它定义了插件的执行逻辑，也就是"做什么"；另一方面也声明了插件的作用阶段，即"什么时候做"，这与 Rollup 本身的
构建生命周期息息相关。
3.2 对于一次完整的构建过程而言， Rollup 会先进入到 Build 阶段，解析各模块的内容及依赖关系，然后进入 Output 阶段，完成打包及输出的过程。对于不同的阶段，
Rollup 插件会有不同的插件工作流程。
3.3 插件的各种 Hook 可以根据这两个构建阶段分为两类: Build Hook 与 Output Hook 。
3.3.1 Build Hook 即在 Build 阶段执行的钩子函数，在这个阶段主要进行模块代码的转换、AST 解析以及模块依赖的解析，那么这个阶段的 Hook 对于代码的操作粒度一般
为模块级别，也就是单文件级别。
3.3.2 Ouput Hook (官方称为 Output Generation Hook )，则主要进行代码的打包，对于代码而言，操作粒度一般为 chunk 级别(一个 chunk 通常指很多文件打包到一的产
物)。
3.3 除了根据构建阶段可以将 Rollup 插件进行分类，根据不同的 Hook 执行方式也会有不同的分类，主要包括 Async 、 Sync 、 Parallel 、 Squential 、 First 这五种
