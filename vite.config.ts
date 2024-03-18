import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  preview: {
    port: 8098,
    strictPort: true,
  },
  server: {
    port: 8098,
    strictPort: true,
    host: true,
    origin: "http://0.0.0.0:8080",
  },
});
