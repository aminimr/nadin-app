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
                <span class="nav-text">{{ $t('sidebar.dashboard') }}</span>
            </a-menu-item>
            <a-menu-item key="todos">
                <profile-outlined/>
                <span class="nav-text">{{ $t('sidebar.todos') }}</span>
            </a-menu-item>
            <a-menu-item key="weather">
                <cloud-outlined/>
                <span class="nav-text">{{ $t('sidebar.weather') }}</span>
            </a-menu-item>
            <a-menu-item key="profile">
                <user-outlined/>
                <span class="nav-text">{{ $t('sidebar.profile') }}</span>
            </a-menu-item>
        </a-menu>
    </a-layout-sider>
</template>
<script setup>
import {
    UserOutlined,
    ProfileOutlined,
    AppstoreOutlined,
    CloudOutlined
} from '@ant-design/icons-vue';
import {nextTick, onMounted, ref, watch} from 'vue'
import {useRouter} from 'vue-router'

const router = useRouter()
const selectedMenu = ref(['dashboard'])

function onMenuClicked({key}) {
    router.push(key === 'dashboard' ? '/' : key)
}
</script>