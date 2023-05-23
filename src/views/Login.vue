<template>
    <div style="display: flex; justify-content: center; padding-top: 20vh">
        <a-form
                :model="formModel"
                name="normal_login"
                class="login-form"
                @finish="onFinish"
                @finishFailed="onFinishFailed"
        >
            <div style="font-size: 22px ; text-align: center ; margin:10px 0">
                Login
            </div>
            <label>
                User Name:
            </label>
            <a-form-item

                    name="username"
                    :rules="[{ required: true, message: 'Please input your username!' }]"
            >
                <a-input v-model:value="formModel.username">
                    <template #prefix>
                        <UserOutlined class="site-form-item-icon"/>
                    </template>
                </a-input>
            </a-form-item>
            <label>
                Password:
            </label>
            <a-form-item
                    name="password"
                    :rules="[{ required: true, message: 'Please input your password!' }]"
            >
                <a-input-password v-model:value="formModel.password">
                    <template #prefix>
                        <LockOutlined class="site-form-item-icon"/>
                    </template>
                </a-input-password>
            </a-form-item>

            <a-form-item>
                <a-button style="width: 100%" :disabled="disabled" type="primary" html-type="submit"
                          class="login-form-button">
                    Log in
                </a-button>
            </a-form-item>
        </a-form>
    </div>
</template>
<script setup>
import {ref, computed} from 'vue';
import {UserOutlined, LockOutlined} from '@ant-design/icons-vue';

import {useAuthStore} from '@/stores/auth';
import {useRoute, useRouter} from "vue-router";

const router = useRouter()
const auth = useAuthStore()
const route = useRoute()
const formModel = ref({
    username: 'admin',
    password: 'admin'
})
const disabled = computed(() => !(formModel.value?.username && formModel.value?.password))

function onFinish() {
    auth.login(formModel.value).then(() => {
        router.replace({path: '/'}) // route.query?.redirect || '/'
    })
}

function onFinishFailed() {
    alert('نام کاربری یا کلمه عبور صحیح نمی باشد.')
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
