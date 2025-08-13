Vite 开发阶段会模拟 Rollup 的行为
其中 Vite 会调用一系列与 Rollup 兼容的钩子，这个钩子主要分为三个阶段:
服务器启动阶段: options 和 buildStart 钩子会在服务启动时被调用。
请求响应阶段: 当浏览器发起请求时，Vite 内部依次调用 resolveId 、 load 和 transform 钩子。
服务器关闭阶段: Vite 会依次执行 buildEnd 和 closeBundle 钩子。
除了以上钩子，其他 Rollup 插件钩子(如 moduleParsed 、 renderChunk )均不会在 Vite 开发阶段调用。而生产环境下，由于 Vite 直接使用 Rollup，Vite 插件中所有
Rollup 的插件钩子都会生效。

Vite 独有的五个钩子:
config : 用来进一步修改配置。
configResolved : 用来记录最终的配置信息。
configureServer : 用来获取 Vite Dev Server 实例，添加中间件。
transformIndexHtml : 用来转换 HTML 的内容。
handleHotUpdate : 用来进行热更新模块的过滤，或者进行自定义的热更新处理。
可以分别通过 apply 和 enforce 两个参数来进行手动的控制。

//默认情况下 Vite 插件同时被用于开发环境和生产环境，你可以通过 apply 属性来决定应用场景:

<!--
{
    // 'serve' 表示仅用于开发环境，'build'表示仅用于生产环境
    apply: 'serve'
}
-->

//enforce 属性来指定插件的执行顺序

<!--
{
    // 默认为`normal`，可取值还有`pre`和`post`
    enforce: 'pre'
}
-->
