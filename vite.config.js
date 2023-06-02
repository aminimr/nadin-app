import {fileURLToPath} from 'url'
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue({reactivityTransform: true}),
        VueI18nPlugin({
            runtimeOnly: false, // <---
        })
    ],
    base: '/',
    mode: 'development', // or 'production'
    publicDir: 'public',
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    server: {
        port: 8089
    }
})
