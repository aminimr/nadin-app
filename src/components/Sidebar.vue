<template>
    <a-layout-sider
            breakpoint="lg"
            collapsed-width="0"
    >
        <h1 style="display: flex; justify-content: center; align-items: center; padding: 4px 8px; color: rgba(255,255,255,.4); height: 50px;">
            {{ $t('common.companyName') }}
        </h1>
        <a-menu theme="dark" mode="inline" @click="onMenuClicked" v-model:selectedKeys="selectedMenu">
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
                <a-modal v-model:visible="visible">
                    <p>{{ $t('messages.logOutMessage') }}</p>
                    <template #footer>
                        <a-button key="back" @click="handleCancel">{{ $t('pages.cancel') }}</a-button>
                        <a-button key="submit" type="primary" :loading="loading" @click="handleOk">{{
                            $t('pages.logout')
                            }}</a-button>
                    </template>
                </a-modal>
            </a-menu-item>
        </a-menu>
    </a-layout-sider>
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

const {showSuccess} = useNotification()
const router = useRouter()
const selectedMenu = ref(['dashboard'])
const authStore = useAuthStore()
const {t} = useI18n()

const visible = ref<boolean>(false);
const loading = ref<boolean>(false);
const showModal = () => {
    visible.value = true;
};

const handleOk = () => {
    logOut()
    setTimeout(() => {
        loading.value = false;
        visible.value = false;
    }, 2000);
};

const handleCancel = () => {
    visible.value = false;
};

function logOut() {
    authStore.logout()
    router.replace({path: '/login'})
    showSuccess(`${t('messages.logoutSuccess')}`)
}

function onMenuClicked({key}) {
    if (key === 'logout') {

        return showModal()
    }
    router.push(key === 'dashboard' ? '/' : key)
}
</script>