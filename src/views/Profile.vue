<script setup>
import {computed, ref, watch} from "vue";
import {CheckOutlined} from '@ant-design/icons-vue';
import {useAuthStore} from '@/stores/auth.js';
import {useThemeStore} from '@/stores/theme.js';
import FormControl from "@/components/FormControl.vue";
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()

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

const userName = computed({
    get() {
        return authStore.userInfo?.username
    },
    set(name) {
        authStore.updateUserInfo({username: name})
    }
})
</script>

<template>
    <section class="content-page">
        <div class="center profile-settings" style="min-width: 300px ; max-width: 300px">
            <!--            <a-input v-model:value="newName" :placeholder="userName"/>-->
            <form-control :label="t('common.username')+':'">
            <div style="display: flex">
                <a-input v-model:value="userName" :placeholder="userName"/>
<!--                <a-button @click="changeName" :disabled="userName === 'admin' " type="primary" style="width: 60px" >-->
<!--                    <template #icon>-->
<!--                        <check-outlined />-->
<!--                    </template>-->
<!--                </a-button>-->
            </div>
            </form-control>
            <a-divider />
            <form-control :label="t('common.theme')+':'">
                <a-radio-group v-model:value="theme" button-style="solid">
                    <a-radio-button v-for="item in options" :key="item" :value="item">{{
                            t(`themes.${item}`)
                        }}
                    </a-radio-button>
                </a-radio-group>
            </form-control>
            <a-divider />
            <form-control :label="t('common.language')+':'">
                <a-select
                    ref="select"
                    v-model:value="locale"
                    style="width: 100%"
                >
                    <a-select-option value="en">{{t('languages.english')}}</a-select-option>
                    <a-select-option value="fa">{{t('languages.persian')}}</a-select-option>
                </a-select>
            </form-control>
<!--            <a-divider />-->
<!--            <a-button style="width: 100%;" @click="saveChanges" type="primary">Save</a-button>-->
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
</style>