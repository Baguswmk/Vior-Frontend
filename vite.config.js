import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: 'https://vior-frontend.vercel.app/',
  server: {
    port: 3000,
  },
  assetsInclude: ["**/*.glb"],
  build: {
    outDir: "dist",
  },
});
