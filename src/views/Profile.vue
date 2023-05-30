<script setup lang="ts">
import {computed, ref} from "vue";
import {useAuthStore} from '@/stores/auth.ts';
import {useThemeStore} from '@/stores/theme.ts';
import FormControl from "../components/FormControl.vue";
import {useI18n} from 'vue-i18n'
import {useRouter} from "vue-router";
import {useNotification} from "@/utils/NotificationManager";
import {CheckOutlined} from "@ant-design/icons-vue";

const {t, locale} = useI18n()
const {showSuccess, showError} = useNotification()
const router = useRouter()
const authStore = useAuthStore()
const themeStore = useThemeStore()
const options = themeStore.allowedThemes

const theme = computed({
    get() {
        return themeStore.theme
    },
    set(newTheme) {
        themeStore.changeTheme(newTheme)
    }
})

const fullName = ref(authStore.displayName)

function updateFullName() {
    authStore.setUserInfo({fullName: fullName.value})
    showSuccess(`${t('messages.changeNameSuccess')}`)
}

function logOut() {
    authStore.logout()
    router.replace({path: '/login'})
    showSuccess(`${t('messages.logoutSuccess')}`)
}

</script>

<template>
    <section class="content-page">
        <div class="center profile-settings" style="min-width: 300px ; max-width: 300px">
            <form-control :label="t('common.username')+':'">
                <div style="display: flex ; justify-content: center ; align-items: center">
                    <a-input
                        @keydown.enter="updateFullName"
                            size="large" v-model:value="fullName"
                            :placeholder="$t('common.title')">
                    </a-input>
                    <a-button type="primary"
                              class="save-change">
                        <check-outlined @click="updateFullName" html-type="submit"/>
                    </a-button>
                </div>
            </form-control>
            <a-divider/>
            <form-control :label="t('common.theme')+':'">
                <a-radio-group v-model:value="theme" button-style="solid">
                    <a-radio-button v-for="item in options" :key="item" :value="item">{{ t(`themes.${item}`) }}
                    </a-radio-button>
                </a-radio-group>
            </form-control>
            <a-divider/>
            <form-control :label="t('common.language')+':'">
                <a-select
                        ref="select"
                        v-model:value="locale"
                        style="width: 100%"
                >
                    <a-select-option value="en">{{ t('languages.english') }}</a-select-option>
                    <a-select-option value="fa">{{ t('languages.persian') }}</a-select-option>
                </a-select>
            </form-control>
            <a-divider/>
            <a-button @click="logOut()" type="primary">Logout</a-button>
        </div>

    </section>
</template>

<style scoped>
.profile-settings {
    min-height: 150px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}

.save-change {
    font-size: 18px;
    width: 24px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center
}
</style>