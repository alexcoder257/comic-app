import { defineConfig } from "vite";
import { resolve } from "node:path";
import vue from "@vitejs/plugin-vue";
const projectRootDir = resolve(__dirname);
// https://vitejs.dev/config/
export default defineConfig({
  base: "",
  plugins: [vue()],
  resolve: {
    alias: {
      "@": resolve(projectRootDir, "./src"),
    },
  },
});
