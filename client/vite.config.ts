import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // the port the client runs on in development
    port: 3000,
    // this proxies the requests to /api/ to the backend server
    // proxy: {
    //   "/api/": {
    //     target: `${import.meta.env.VITE_SERVER_URL}/api/`,
    //     changeOrigin: true,
    //     secure: false,
    //   },
    // },
    // Specify which IP addresses the server should listen on
    host: true,
    // Automatically open the app in the browser on server start
    open: true,
  },
  preview: {
    port: 3000,
    host: true,
    open: true,
  },
  build: {
    outDir: "build",
  },
});
