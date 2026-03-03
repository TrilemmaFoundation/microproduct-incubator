import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  build: {
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Optimize chunk size warnings
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        // Manual chunk splitting for better caching
        manualChunks: {
          // Vendor chunk for React ecosystem
          "vendor-react": ["react", "react-dom", "react-router-dom"],
          // Separate chunk for data table library
          "vendor-table": ["@tanstack/react-table"],
          // Utilities chunk
          "vendor-utils": ["date-fns"],
          // Maps chunk
          "vendor-maps": ["leaflet", "react-leaflet"],
        },
        // Consistent file naming for caching
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name || "";
          if (/\.(png|jpe?g|gif|svg|webp|ico)$/i.test(name)) {
            return "assets/images/[name]-[hash][extname]";
          }
          if (/\.css$/i.test(name)) {
            return "assets/css/[name]-[hash][extname]";
          }
          return "assets/[name]-[hash][extname]";
        },
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
      },
    },
    // Minification settings
    minify: "esbuild",
    // Target modern browsers for smaller bundles
    target: "es2020",
  },
});
