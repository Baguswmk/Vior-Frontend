import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: 'http://www.vior-e-commerce.my.id/',
  server: {
    port: 3000,
  },
  assetsInclude: ["**/*.glb"],
  build: {
    outDir: "dist",
  },
});
