import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Built files go in /static (not Vite's default /assets). On the live server an
  // upload then never has to replace the previous build's folder, and no cached
  // copy of an older file can be served in place of a new one.
  build: { assetsDir: 'static' },
})
