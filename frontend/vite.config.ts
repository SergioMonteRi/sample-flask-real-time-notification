import path from 'node:path'

import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const proxyTarget = env.VITE_API_PROXY_TARGET ?? 'http://127.0.0.1:5000'

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
          target: proxyTarget,
          changeOrigin: true,
          rewrite: (requestPath) => requestPath.replace(/^\/api/, ''),
        },

        /**
         * Canal do Flask-SocketIO. `ws: true` repassa o upgrade para
         * WebSocket, e a ausencia de `rewrite` e proposital: o Engine.IO
         * atende exatamente em /socket.io no backend.
         */
        '/socket.io': {
          target: proxyTarget,
          changeOrigin: true,
          ws: true,
        },
      },
    },
  }
})
