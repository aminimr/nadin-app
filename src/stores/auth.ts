import {defineStore} from 'pinia'
import {computed, ref} from 'vue'
import {
    AuthUser,
    UserModel,
    Token,
    SignInType,
    loginByPasskey,
    loginByToken,
    EditableUserModel
} from '@/services/authService'

export const useAuthStore = defineStore('auth', () => {
    const token = ref<Token>('')
    const isLoggedIn = computed(() => !!token.value)
    const userInfo = ref<UserModel | null>(null)
    const displayName = computed(() => userInfo.value?.fullName || '')
    const userId = computed(() => userInfo.value?.userId || '')
    const userTheme = computed(() => userInfo.value?.theme || '')
    const userLanguage = computed(() => userInfo.value?.lang || '')

    async function logout() {
        clearSession()
        return Promise.resolve()
    }

    function setUserInfo(user: EditableUserModel) {
        if (!userInfo.value) return

        if (user.fullName) userInfo.value.fullName = user.fullName
        if (user.theme) userInfo.value.theme = user.theme
        if (user.lang) userInfo.value.lang = user.lang

        // save user info in localStorage
        localStorage.setItem(userInfo.value.userId, JSON.stringify(userInfo.value))
    }

    function createSession(user: UserModel, accessToken: Token, persist: boolean = true) {
        userInfo.value = user

        // save user info in localStorage
        localStorage.setItem(user.userId, JSON.stringify(user))

        token.value = accessToken

        if (persist) {
            // set in localStorage
            localStorage.token = accessToken
        } else {
            localStorage.removeItem('token')
        }
    }

    function clearSession(){
        localStorage.removeItem(userId.value)
        localStorage.removeItem('token')

        userInfo.value = null
        token.value = ''
    }

    async function login(user: AuthUser): Promise<SignInType> {
        try {
            const res = await loginByPasskey(user)
            if (res.success) { // login is ok
                createSession(res.data.user, res.data.accessToken, user.persist)
            }

            return Promise.resolve(res)
        } catch (ex: any) {
            return Promise.resolve({
                success: false,
                msg: ex.message || 'messages.loginError',
                data: null
            })
        }
    }

    async function silentlyLogin(accessToken: Token): Promise<SignInType> {
        try {
            const res = await loginByToken(accessToken)
            if (res.success) { // login is ok
                createSession(res.data.user, accessToken)
            }

            return Promise.resolve(res)
        } catch (ex: any) {
            return Promise.resolve({
                success: false,
                msg: ex.message || 'messages.loginError',
                data: null
            })
        }
    }

    return {
        isLoggedIn,
        userInfo,
        displayName,
        userTheme,
        userLanguage,
        userId,
        token,
        login,
        silentlyLogin,
        logout,
        clearSession,
        setUserInfo,
    }
})