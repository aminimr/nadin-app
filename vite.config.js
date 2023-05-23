import {fileURLToPath} from 'url'
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
// import Components from 'unplugin-vue-components/vite';
// import {AntDesignVueResolver} from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue({reactivityTransform: true}),
        VueI18nPlugin({
            runtimeOnly: false, // <---
            // include: resolve(dirname(fileURLToPath(import.meta.url)), './src/i18n/locales/**'),
        }),
        // Components({
        //     resolvers: [AntDesignVueResolver()],
        // })
    ],
    base: '/',
    mode: 'development', // or 'production'
    publicDir: 'public',
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
})
