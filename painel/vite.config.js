import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      // Ignora alterações no arquivo .env para evitar o loop infinito
      ignored: ['**/.env'] 
    }
  }
})