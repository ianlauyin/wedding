import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import devtools from "solid-devtools/vite";
import path from "path";
import suidPlugin from "@suid/vite-plugin";

export default defineConfig({
  plugins: [devtools(), solidPlugin(), suidPlugin()],
  server: {
    port: 3000,
  },
  build: {
    target: "esnext",
  },
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "./src/component"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@ajax": path.resolve(__dirname, "./src/ajax"),
      "@util": path.resolve(__dirname, "./src/util"),
    },
  },
});
