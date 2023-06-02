<script setup lang="ts">
import {computed, reactive} from "vue";
import {useAuthStore} from '@/stores/auth';
import {useThemeStore} from '@/stores/theme';
import {useI18n} from 'vue-i18n'
import {useRouter} from "vue-router";
import {useNotification} from "@/utils/NotificationManager";
import {EditOutlined} from "@ant-design/icons-vue";
import PageWrapper from "@/components/PageWrapper.vue";

const {t, locale} = useI18n()
const {showSuccess, showError} = useNotification()
const router = useRouter()
const authStore = useAuthStore()
const themeStore = useThemeStore()
const options = themeStore.allowedThemes


const rules = {
    fullName: {
        type: 'string',
        required: true,
        trigger: 'change',
    }
}

interface IFormModel {
    fullName: string
}

const formModel = reactive<IFormModel>({
    fullName: authStore.displayName
});

const theme = computed({
    get() {
        return themeStore.theme
    },
    set(newTheme) {
        authStore.setUserInfo({theme: newTheme})
        themeStore.changeTheme(newTheme)
    }
})

const isFullNameChanged = computed(() => (authStore.displayName !== formModel.fullName) && formModel.fullName.length > 0)

function updateFullName() {
    if(!isFullNameChanged.value) return
    authStore.setUserInfo({fullName: formModel.fullName})
    showSuccess(`${t('messages.changeNameSuccess')}`)
}

function resetFullName() {
    formModel.fullName = authStore.displayName
}
</script>

<template>
    <page-wrapper :title="$t('pages.profile')">
        <div class="profile-settings" style="width: 360px; max-width: 100%">
            <a-form
                    :model="formModel"
                    autocomplete="off"
                    @finish="updateFullName"
                    :rules="rules"
            >
                <a-form-item
                        :label-col="{ sm: {span: 6} }"
                        :label="$t('common.fullName')"
                        ref="fullName"
                        name="fullName">
                    <div style="display: flex ; justify-content: center ; align-items: center">
                        <a-input
                                @keydown.enter="updateFullName"
                                @keydown.esc="resetFullName"
                                v-model:value="formModel.fullName"
                                :placeholder="$t('common.fullName')">
                        </a-input>
                        <a-button type="primary"
                                  class="save-change"
                                  @click="updateFullName"
                                  html-type="submit"
                                  :disabled="!isFullNameChanged"
                        >


                            <edit-outlined html-type="submit"/>
                        </a-button>
                    </div>
                </a-form-item>
            </a-form>
            <a-form>
                <a-divider/>
                <a-form-item :label-col="{ sm: {span: 6} }" :label="t('common.language')">
                    <a-select
                            ref="select"
                            v-model:value="locale"
                            style="width: 100%"
                    >
                        <a-select-option value="en">{{ t('languages.english') }}</a-select-option>
                        <a-select-option value="fa">{{ t('languages.persian') }}</a-select-option>
                    </a-select>
                </a-form-item>
                <a-divider/>
                <a-form-item :label-col="{ sm: {span: 6} }" :label="t('common.theme')">
                    <a-radio-group v-model:value="theme" button-style="solid">
                        <a-radio-button v-for="item in options" :key="item" :value="item">{{ t(`themes.${item}`) }}
                        </a-radio-button>
                    </a-radio-group>
                </a-form-item>
            </a-form>
        </div>
    </page-wrapper>
</template>

<style scoped>
.save-change {
    font-size: 18px;
    width: 24px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center
}
</style>