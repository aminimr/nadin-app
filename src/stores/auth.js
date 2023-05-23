import {defineStore} from 'pinia'
import {computed, ref} from 'vue'
import {randomString} from "@/utils/rnd.js";

export const useAuthStore = defineStore('auth', () => {
    const token = ref('')
    const isLoggedIn = computed(() => !!token.value && !!userInfo.value)
    const userInfo = ref(null)

    function logout() {
        userInfo.value = null
        token.value = ''
    }

    function updateUserInfo({username}) {
        userInfo.value.username = username
    }

    async function login({username, password}) {
        if (username === 'admin' && password === 'admin') {
            userInfo.value = {
                username,
                password
            }
            token.value = randomString(128)
            return Promise.resolve()
        } else {
            return Promise.reject()
        }
    }

    return {
        isLoggedIn,
        userInfo,
        token,
        login,
        logout,
        updateUserInfo,
    }
})