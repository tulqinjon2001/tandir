import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

/** CSS ni render-blocking emas qiladi (LCP tezlashadi) */
function deferCss() {
  return {
    name: 'defer-css',
    transformIndexHtml(html: string) {
      return html.replace(
        /<link\s([^>]*rel="stylesheet"[^>]*)>/gi,
        (m) => m.slice(0, -1) + ' media="print" onload="this.media=\'all\'">'
      )
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [deferCss(), inspectAttr(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-motion': ['framer-motion'],
        },
      },
    },
  },
});
