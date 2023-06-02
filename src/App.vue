<template>
    <a-config-provider :direction="t('common.direction')" :locale="antLocale">
        <a-layout>
            <Sidebar :current-route="currentRoute" v-if="auth.isLoggedIn"/>
            <a-layout>
                <a-layout-content :style="{ margin: '24px 16px 0' , height:'100%' }">
                    <router-view/>
                </a-layout-content>
            </a-layout>
        </a-layout>
    </a-config-provider>
</template>
<script setup>
import Sidebar from "@/components/Sidebar.vue";
import {watch, computed, ref} from 'vue'
import {useI18n} from 'vue-i18n'

const {t, locale} = useI18n()

import {useAuthStore} from "@/stores/auth.ts";
import {useThemeStore} from "@/stores/theme.ts"

import en_US from 'ant-design-vue/es/locale/en_US';
import fa_IR from 'ant-design-vue/es/locale/fa_IR';
import {useRoute} from "vue-router";

const auth = useAuthStore()
const route = useRoute()
const themeStore = useThemeStore()
const currentRoute = ref('/')

const antLocale = computed(() => {
    if (locale.value === 'fa') return fa_IR
    return en_US
})

watch(locale, () => {
    auth.setUserInfo({lang: locale.value})
    document.body.dir = t('common.direction')
})

watch(route, () => {
    console.log(route.name)
    currentRoute.value = route.name
})
</script>
