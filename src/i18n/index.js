import {createI18n} from "vue-i18n";

import * as fa from './locales/fa.js'
import * as en from './locales/en.js'

export default createI18n({
    // locale: import.meta.env.VITE_DEFAULT_LOCALE,
    // fallbackLocale: import.meta.env.VITE_FALLBACK_LOCALE,
    locale: "en",
    fallbackLocale: "fa",
    legacy: false,
    globalInjection: true,
    messages: {
        en,
        fa
    }
})