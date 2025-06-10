import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load environment variables if needed
  // const env = loadEnv(mode, process.cwd())
  return {
    plugins: [react()],
    server: {
      host: '0.0.0.0',
      port: 5173,
      strictPort: true,
      // allowedHosts is now empty; you can add domains here if needed
      allowedHosts: [],
    },
    // If you want to use environment variables in your code, use import.meta.env.VITE_...
    // No need to define process.env here unless you have a specific reason
  }
})
