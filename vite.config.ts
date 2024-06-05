import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import tailwindcss from "tailwindcss";
// import basicSsl from "@vitejs/plugin-basic-ssl";
import fs from "fs";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5172,
    // https: { key: fs.readFileSync("key.pem"), cert: fs.readFileSync("cert.pem") },
  },
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        exportType: "named",
        ref: true,
        svgo: false,
        titleProp: true,
      },
      include: "**/*.svg",
    }),
    // basicSsl({
    //   /** name of certification */
    //   name: "test",
    //   /** custom trust domains */
    //   domains: ["*.custom.com"],
    //   /** custom certification directory */
    //   certDir: "/Users/.../.devServer/cert",
    // }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
});
