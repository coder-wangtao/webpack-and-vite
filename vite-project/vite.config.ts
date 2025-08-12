import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import autoprefixer from "autoprefixer";
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
});
