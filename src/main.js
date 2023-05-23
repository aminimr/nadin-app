import {createApp} from 'vue'
import registerPlugins from './boot/plugins.js'
import registerComponents from './boot/registerComponents.js'
import App from './App.vue'
import i18n from "./i18n"

import './css/app.scss'

const app = createApp(App).use(i18n)

registerPlugins(app)
registerComponents(app)

app.mount('#app')
