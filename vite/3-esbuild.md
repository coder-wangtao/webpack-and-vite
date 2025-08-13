1.esbuild.server esbuild.build
2.Transform API
除了项目的打包功能之后，Esbuild 还专门提供了单文件编译的能力，即 TransformAPI。Vite 的底层实现也是采用 transform 这个异步的 API 进行 TS 及 JSX 的单文件转译的。
3.Esbuild loader
3.Esbuild 插件
esbuild 不是像 Webpack 是一个大一统项目，提供完善的插件机制，而是在极度精简之后的打包工具，快才是它的追求目标。
未发布 1.0 版本，目前版本 0.25.8
