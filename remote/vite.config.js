import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "remote_app",
      filename: "remoteEntry.js",
      remotes: {
        'nestedWebpackRemote': {
          external: 'http://localhost:5002/remoteEntry.js',
          from: 'webpack',
          format: 'var'
        }
      },
      exposes: {
        './Button': './src/components/Button'
      },
      shared: ['react','react-dom']
    })
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  }
})
