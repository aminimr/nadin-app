import {createI18n} from "vue-i18n";

import * as fa from './locales/fa'
import * as en from './locales/en'

const i18n = createI18n({
    locale: import.meta.env.VITE_DEFAULT_LOCALE,
    fallbackLocale: import.meta.env.VITE_FALLBACK_LOCALE,
    legacy: false,
    globalInjection: true,
    messages: {
        en,
        fa
    }
})
export default i18n