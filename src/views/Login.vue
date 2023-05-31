<template>
    <div style="display: flex; justify-content: center; padding-top: 20vh">
        <a-form
                :model="formModel"
                name="normal_login"
                class="login-form"
                :rules="rules"
                @finish="onFinish"
                @finishFailed="onFinishFailed"
        >
            <div style="font-size: 22px ; text-align: center ; margin:10px 0">
                {{ $t(`common.login`) }}
            </div>
            <label>
                {{ $t(`common.username`) }}
            </label>
            <a-form-item
                    style="margin-top:5px"
                    ref="username"
                    name="username"
            >
                <a-input v-model:value="formModel.username"/>
            </a-form-item>
            <label>
                {{ $t(`common.password`) }}
            </label>
            <a-form-item
                    style="margin-top:5px"
                    name="password"
                    ref="password"
            >
                <a-input-password v-model:value="formModel.password"/>
            </a-form-item>

            <a-form-item style="margin-top: 20px">
                <a-button style="width: 100%" type="primary" html-type="submit"
                          class="login-form-button">
                    {{ $t('common.login') }}
                </a-button>
            </a-form-item>
        </a-form>
    </div>
</template>
<script setup lang="ts">
import {reactive} from 'vue';
import {useAuthStore} from '@/stores/auth.js';
import {useRouter} from "vue-router";
import {useI18n} from "vue-i18n";
import {formValidator} from '@/utils/FormValidator'
import {useNotification} from "@/utils/NotificationManager";
import {AuthUser} from "@/services/authService";
import {useThemeStore} from "@/stores/theme";


const router = useRouter()
const auth = useAuthStore()
const theme = useThemeStore()
const {t} = useI18n()
const {showSuccess, showError} = useNotification()

// Form Model
const formModel = reactive<AuthUser>({
    username: "admin",
    password: "Admin@123",
    persist: true
});

function onFinish() {
    auth.login(formModel).then((res) => {
        if (res.success) {
            showSuccess(`${t('messages.loginSuccess')}`)
            if (res.data.user.theme) theme.changeTheme(res.data.user.theme)
            router.replace({path: '/'})
        } else {
            showError(`${t('messages.loginFailed')}`)
        }
    })
}

function onFinishFailed() {
    showError(`${t('messages.loginError')}`)
}

const rules = {
    username: {
        type: 'string',
        required: true,
        validator: formValidator(/^[a-zA-Z0-9@.]/, t('common.userNameValidateMessage')),
        trigger: 'change',
    },
    password: {
        type: 'string',
        required: true,
        validator: formValidator(/^[a-zA-Z0-9!@#$%^&*]{6,16}$/, t('common.passwordValidateMessage')),
        trigger: 'change',
    }
}

</script>
<style lang="scss">
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}

#components-form-demo-normal-login .login-form-forgot {
  float: right;
}

#components-form-demo-normal-login .login-form-button {
  width: 100%;
}

.login-form {
  min-width: 350px;
  max-width: 450px;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}
</style>
