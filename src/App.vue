<template>
    <a-config-provider :direction="t('common.direction')" :locale="antLocale">
        <a-layout>
            <Sidebar v-if="auth.isLoggedIn"/>
            <a-layout>
                <a-layout-content :style="{ margin: '24px 16px 0' , height:'100%' }">
                    <router-view/>
                </a-layout-content>
            </a-layout>
        </a-layout>
    </a-config-provider>
</template>
<script setup>
import {watch, computed, onMounted, onBeforeMount} from 'vue'
import {useI18n} from 'vue-i18n'

const {t, locale} = useI18n()

import {useAuthStore} from "@/stores/auth.ts";
import {useThemeStore} from "@/stores/theme.ts"

import en_US from 'ant-design-vue/es/locale/en_US';
import fa_IR from 'ant-design-vue/es/locale/fa_IR';

const auth = useAuthStore()
const themeStore = useThemeStore()

import Sidebar from "@/components/Sidebar.vue";
import {useRouter} from "vue-router";

const router = useRouter()
const antLocale = computed(() => {
    console.log('locale', locale.value)
    if (locale.value === 'fa') return fa_IR
    return en_US
})

onBeforeMount(() => {
    themeStore.initTheme()
    auth.silentlyLogin(localStorage.token).then(({success, data}) => {
        if (success) {
            themeStore.changeTheme(data.user.theme)
            locale.value = data.user.lang
            router.replace({path: '/'})
        }
    })
})

onMounted(() => {
    // locale.value = localStorage.lang || 'fa'
    console.log(import.meta.env.VITE_BASE_URL)
})

watch(locale, () => {
    auth.setUserInfo({lang: locale.value})
    const dir = t('common.direction')
    document.body.dir = dir
})
</script>
