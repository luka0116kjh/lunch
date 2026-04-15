import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/lunch/', // GitHub Pages sub-path: https://luka0116kjh.github.io/lunch/
})
