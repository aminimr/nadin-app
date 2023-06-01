import { createPinia } from 'pinia'
import {App} from 'vue'
import Antd from 'ant-design-vue';
import router from '@/router/index'
import i18n from '@/i18n'
import LocalizedFormat from 'dayjs/esm/plugin/LocalizedFormat'
import dayjs from 'dayjs'

import 'ant-design-vue/dist/antd.variable.min.css'

export default function(app: App<Element>){
    // pinia
    app.use(createPinia())

    //dayjs
    dayjs.extend(LocalizedFormat)

    // i18n
    app.use(i18n)

    // antd
    app.use(Antd)

    // router
    app.use(router)
}