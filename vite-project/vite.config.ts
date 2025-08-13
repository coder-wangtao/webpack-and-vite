import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import autoprefixer from "autoprefixer";
// import virtual from "./plugins/virtual-module.ts";
// https://vite.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [
        autoprefixer({
          // 指定目标浏览器
          overrideBrowserslist: ["Chrome > 40", "ff > 31", "ie 11"],
        }),
      ],
    },
    modules: {
      generateScopedName: "[name]__[local]___[hash:base64:5]",
    },
  },
  optimizeDeps: {
    entries: ["./src/main.vue"],
    include: ["lodash-es", "vue"],
  },
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // 将 React 相关库打包成单独的 chunk 中
          "react-vendor": ["react", "react-dom"],
          // 将 Lodash 库的代码单独打包
          lodash: ["lodash-es"],
          // 将组件库的代码打包
          library: ["antd", "@arco-design/web-react"],
        },
      },
    },
  },
});
