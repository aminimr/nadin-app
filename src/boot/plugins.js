import { createPinia } from 'pinia'
import dayjs from 'dayjs'
import LocalizedFormat from 'dayjs/esm/plugin/LocalizedFormat'
import router from '@/router'
import i18n from '@/i18n'

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.variable.min.css'

export default function(app){
    // pinia
    const pinia = createPinia()
    app.use(pinia)

    //dayjs
    dayjs.extend(LocalizedFormat)
    app.use(dayjs)

    // i18n
    app.use(i18n)

    // antd
    app.use(Antd)

    // router
    app.use(router)

    return {
        pinia,
        router
    }
}