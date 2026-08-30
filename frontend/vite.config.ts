import path from 'node:path'

import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    resolve: {
      alias: { '@': path.resolve(import.meta.dirname, 'src') },
    },
    server: {
      port: 5173,
      proxy: {
        /**
         * O backend Flask nao habilita CORS. O proxy do Vite faz o browser
         * enxergar a API na mesma origem do front, evitando qualquer
         * alteracao no projeto Python.
         */
        '/api': {
          target: env.VITE_API_PROXY_TARGET ?? 'http://127.0.0.1:5000',
          changeOrigin: true,
          rewrite: (requestPath) => requestPath.replace(/^\/api/, ''),
        },
      },
    },
  }
})
