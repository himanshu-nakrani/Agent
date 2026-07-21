import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Project site on GitHub Pages: https://himanshu-nakrani.github.io/Agent/
export default defineConfig({
  base: "/Agent/",
  appType: "spa",
  optimizeDeps: {
    include: ["react", "react-dom/client"],
  },
  server: {
    host: "0.0.0.0",
    allowedHosts: ["terminal.local"],
    warmup: {
      clientFiles: ["./src/main.jsx"],
    },
  },
  plugins: [react()],
});
