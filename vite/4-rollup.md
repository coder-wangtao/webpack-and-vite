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
3.4 除了根据构建阶段可以将 Rollup 插件进行分类，根据不同的 Hook 执行方式也会有不同的分类，主要包括 Async 、 Sync 、 Parallel 、 Squential 、 First 这五种

3.4.1 Async & Sync: 首先是 Async 和 Sync 钩子函数，两者其实是相对的，分别代表 异步 和 同步 的钩子函数，两者最大的区别在于同步钩子里面不能有异步逻辑，而异步钩子可以有。

3.4.2 Parallel: 这里指并行的钩子函数。如果有多个插件实现了这个钩子的逻辑，一旦有钩子函数是异步逻辑，则并发执行钩子函数，不会等待当前钩子完成(底层使用 Promise.all)。比如对于 Build 阶段的 buildStart 钩子，它的执行时机其实是在构建刚开始的时候，各个插件可以在这个钩子当中做一些状态的初始化操作，但其实插件之间的操作并不是相互依赖的，也就是可以并发执行，从而提升构建性能。反之，对于需要依赖其他插件处理结果的情况就不适合用 Parallel 钩子了，比如 transform 。

3.4.3 Sequential: equential 指串行的钩子函数。这种 Hook 往往适用于插件间处理结果相互依赖的情况，前一个插件 Hook 的返回值作为后续插件的入参，这种情况就需要等待前一个插件执行完 Hook，获得其执行结果，然后才能进行下一个插件相应 Hook 的调用，如 transform 。

3.4.3 First:如果有多个插件实现了这个 Hook，那么 Hook 将依次运行，直到返回一个非 null 或非 undefined 的值为止。比较典型的 Hook 是 resolveId ，一旦有插件的 resolveId 返回了一个路径，将停止执行后续插件的 resolveId 逻辑。

3.5 刚刚我们介绍了 Rollup 当中不同插件 Hook 的类型，实际上不同的类型是可以叠加的， Async / Sync 可以搭配后面三种类型中的任意一种，比如一个 Hook 既可以是 Async 也可以是 First 类型。

3.6 Rollup 的插件开发整体上是非常简洁和灵活的，总结为以下几个方面:
3.6.1 插件逻辑集中管理。各个阶段的 Hook 都可以放在一个插件中编写，比如上述两个 Webpack 的 Loader 和 Plugin 功能在 Rollup 只需要用一个插件，分别通过 transform 和 renderChunk 两个 Hook 来实现。
3.6.7 插件 API 简洁，符合直觉。Rollup 插件基本上只需要返回一个包含 name 和各种钩子函数的对象即可，也就是声明一个 name 属性，然后写几个钩子函数即可
3.6.8 插件间的互相调用。比如刚刚介绍的 alias 插件，可以通过插件上下文对象的 resolve 方法，继续调用其它插件的 resolveId 钩子，类似的还有 load 方法，这就
大大增加了插件的灵活性。
