1.hmr
HMR API:这套 HMR 系统基于原生的 ESM 模块规范来实现，在文件发生改变时 Vite 会侦测到相应 ES 模块的变化，从而触发相应的 API，实现局部的更新。
Vite 的 HMR API 它基于一套完整的 ESM HMR 规范来实现，这个规范由同时期的 no-bundle 构建工具 Snowpack、WMR 与 Vite 一起制定，是一个比较通用的规范。

<!--
interface ImportMeta {
    readonly hot?: {
        readonly data: any
        accept(): void
        accept(cb: (mod: any) => void): void
        accept(cb: (mod: any) => void): void
        accept(dep: string, cb: (mod: any) => void): void
        accept(deps: string[], cb: (mods: any[]) => void): void
        prune(cb: () => void): void
        dispose(cb: (data: any) => void): void
        decline(): void
        invalidate(): void
        on(event: string, cb: (...args: any[]) => void): void
    }
}
-->

import.meta 对象为现代浏览器原生的一个内置对象，Vite 所做的事情就是在这个对象上的 hot 属性中定义了一套完整的属性和方法。因此，在 Vite 当中，你就可以通过 import.meta.hot 来访问关于 HMR 的这些属性和方法。

Vite 接受更新的策略: 接受自身更新 、 接受依赖模块的更新 和 接受多个子模块的更新 ，并通过具体的示例来进行这三种情况的代码演示，可以看到在代码发生变动的时候，Vite 会定位到发生变化的局部模块，也就是找到对应的 HMR 边界，然后基于这个边界进行更新，其他的模块并没有受到影响，这也是 Vite 中的热更新的时间也到达毫秒级别的重要原因。
//1.接受自身模块的更新

<!--
if (import.meta.hot) {
    import.meta.hot.accept((mod) => mod.render())
} -->

//2.接受依赖模块的更新

<!--
if (import.meta.hot) {
    import.meta.hot.accept('./render.ts', (newModule) => {
        newModule.render();
    })
}
-->

//3.接受多个子模块的更新

<!--
if (import.meta.hot) {
  import.meta.hot.accept(['./render.ts', './state.ts'], (modules) => {
        // 自定义更新
        const [renderModule, stateModule] = modules;
        if (renderModule) {
            renderModule.render();
        }
        if (stateModule) {
            stateModule.initState();
        }
  })
}
-->
