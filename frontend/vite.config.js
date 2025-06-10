import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    allowedHosts:['6be5-2409-40d0-2034-cf80-a5b0-ca15-5e24-f8ea.ngrok-free.app',
      '4110-2409-40d0-2034-cf80-a5b0-ca15-5e24-f8ea.ngrok-free.app',
      'fb77-2409-40d0-2034-cf80-a5b0-ca15-5e24-f8ea.ngrok-free.app',
      '30d4-2409-40d0-2034-cf80-a5b0-ca15-5e24-f8ea.ngrok-free.app',
      '9a71-2409-40d0-2034-cf80-a5b0-ca15-5e24-f8ea.ngrok-free.app',
      '9a71-2409-40d0-2034-cf80-14c5-c32e-a183-5c5d.ngrok-free.app'
    ],
  }
})
