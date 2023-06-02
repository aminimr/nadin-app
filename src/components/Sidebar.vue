<template>
    <a-layout-sider
            breakpoint="lg"
            collapsed-width="60px"
    >
        <h1 style="display: flex; justify-content: center; align-items: center; padding: 4px 8px; color: rgba(255,255,255,.4); height: 50px;">
            {{ $t('common.companyName') }}
        </h1>
        <a-menu theme="dark" mode="inline" @click="onMenuClicked" :selectedKeys="[currentRoute]">
            <a-menu-item key="dashboard">
                <appstore-outlined/>
                <span class="nav-text">{{ $t('pages.dashboard') }}</span>
            </a-menu-item>
            <a-menu-item key="todos">
                <profile-outlined/>
                <span class="nav-text">{{ $t('pages.todos') }}</span>
            </a-menu-item>
            <a-menu-item key="weather">
                <cloud-outlined/>
                <span class="nav-text">{{ $t('pages.weather') }}</span>
            </a-menu-item>
            <a-menu-item key="profile">
                <user-outlined/>
                <span class="nav-text">{{ $t('pages.profile') }}</span>
            </a-menu-item>
            <a-menu-item key="logout">
                <export-outlined/>
                <span class="nav-text">{{ $t('pages.logout') }}</span>
            </a-menu-item>
        </a-menu>
    </a-layout-sider>
    <a-modal v-model:visible="isVisibleLogoutConfirm">
        <p>{{ $t('messages.logOutMessage') }}</p>
        <template #footer>
            <a-button key="back" @click="isVisibleLogoutConfirm=false">{{ $t('pages.cancel') }}</a-button>
            <a-button key="submit" type="primary" @click="logOut">{{
                $t('pages.logout')
                }}
            </a-button>
        </template>
    </a-modal>
</template>
<script setup lang="ts">
import {
    UserOutlined,
    ProfileOutlined,
    AppstoreOutlined,
    CloudOutlined,
    ExportOutlined
} from '@ant-design/icons-vue';
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import {useAuthStore} from "@/stores/auth";
import {useNotification} from "@/utils/NotificationManager";
import {useI18n} from "vue-i18n";

defineProps({
    currentRoute: String
})

const {showSuccess} = useNotification()
const router = useRouter()
const authStore = useAuthStore()
const {t} = useI18n()

const isVisibleLogoutConfirm = ref<boolean>(false);

async function logOut() {
    isVisibleLogoutConfirm.value = false
    await authStore.logout()
    await router.replace({path: '/login'})
    showSuccess(`${t('messages.logoutSuccess')}`)
}

async function onMenuClicked(e: { key: string }) {
    if (e.key === 'logout') {
        isVisibleLogoutConfirm.value = true
        return
    }

    await router.push({path: e.key === 'dashboard' ? '/' : e.key})
}
</script>