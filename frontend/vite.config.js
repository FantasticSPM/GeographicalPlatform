import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { viteStaticCopy } from "vite-plugin-static-copy";

// https://vite.dev/config/
export default defineConfig((e) => {

  const baseUrl = e.mode === "production" ? "/GeographicalPlatform/" : "./"
  const cesiumSource = "node_modules/cesium/Build/Cesium";
  const cesiumBaseUrl = "Cesium";
  const cesiumDir = ['ThirdParty', 'Workers', 'Assets', 'Widgets']
  return {
    define: {
      CESIUM_BASE_URL: JSON.stringify(`${baseUrl}${cesiumBaseUrl}`),
    },
    plugins: [
      vue(),
      vueDevTools(),
      viteStaticCopy({
        targets: cesiumDir.map((dir) => ({
          src: `${cesiumSource}/${dir}`,
          dest: cesiumBaseUrl,
          rename: {
            stripBase: 4
          }
        }))
      })
    ],
    base: baseUrl,
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    optimizeDeps: {
      exclude: ['maplibre-gl'],
    },
  }
})
