import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

import { prismjsPlugin } from "vite-plugin-prismjs";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [
    vue(),
    prismjsPlugin({
      languages: "all", // 语言
      plugins: ["line-numbers", "show-language", "copy-to-clipboard", "inline-color"],
      theme: "okaidia", // 主题
      css: true,
    }),
  ],
  css: {
    // 预处理器配置项
    preprocessorOptions: {
      less: {
        math: "always",
      },
    },
  },
  // 配置别名
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
