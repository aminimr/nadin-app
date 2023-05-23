<template>

    <a-config-provider :direction="t('common.direction')" :locale="antLocale">
        <!--        <div class="flex">
                    <router-link to="/">Dashboard</router-link>
                    <div>&nbsp;&nbsp;/&nbsp;&nbsp;</div>
                    <router-link to="/weather">Weather</router-link>
                </div>-->

<!--        <a-layout-header v-if="auth.isLoggedIn" style="background: #fff">
            <TopHeader/>
        </a-layout-header>-->
        <a-layout>
            <sidebar v-if="auth.isLoggedIn"/>
            <a-layout>
                <a-layout-content :style="{ margin: '24px 16px 0' , height:'100%' }">
                    <router-view/>
                </a-layout-content>
            </a-layout>
        </a-layout>
    </a-config-provider>
</template>
<script setup>
import {watch, computed, ref, onMounted} from 'vue'
import {useI18n} from 'vue-i18n'

const {t, locale} = useI18n()

import {useAuthStore} from "@/stores/auth.js";
import {useThemeStore} from "@/stores/theme.js"

import en_US from 'ant-design-vue/es/locale/en_US.js';
import fa_IR from 'ant-design-vue/es/locale/fa_IR.js';

const auth = useAuthStore()
const themeStore = useThemeStore()

import Sidebar from "@/components/Sidebar.vue";
// import TopHeader from "@/components/TopHeader.vue";

themeStore.initTheme()
const antLocale = computed(() => {
    if (locale === 'fa') return fa_IR
    return en_US
})

onMounted(()=> {
    locale.value = localStorage.lang || 'fa'
})

watch(locale, () => {
    localStorage.lang = locale.value
    const dir = t('common.direction')
    document.body.dir = dir
})
</script>
