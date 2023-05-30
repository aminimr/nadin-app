import mockUsers from '@/mock/users.json'

export type AuthUser = {
    username: string,
    password: string,
    persist: boolean
}

export type UserModel = {
    userId: string,
    username: string,
    fullName?: string,
    lang?: string,
    theme?: string
}

export type EditableUserModel = {
    fullName?: string,
    lang?: string,
    theme?: string
}

export type Token = string

export type SignInType = {
    success: boolean,
    data: any,
    msg?: string
}

export function getUserFromLocalStorage(userId: string): UserModel | null {
    const userInLocalStorage = localStorage.getItem(userId)
    if (!userInLocalStorage) return null
    return JSON.parse(userInLocalStorage)
}

export function updateUserFromLocalStorage(userId: string, user: UserModel): UserModel {
    const storageUser = getUserFromLocalStorage(user.userId)
    if (storageUser) {
        user.fullName = storageUser.fullName || user.fullName
        user.theme = storageUser.theme || user.theme
        user.lang = storageUser.lang || user.lang
    }

    return {
        userId: userId,
        username: user.username,
        fullName: user.fullName,
        lang: user.lang,
        theme: user.theme
    }
}

export async function loginByPasskey(user: AuthUser): Promise<SignInType> {
    if (!user.username) throw new Error('messages.loginError')
    for (let u of mockUsers) {
        const isUsernameMatch = `${user.username}`.toLowerCase() === `${u.username}`.toLowerCase()
        const isPasswordMatch = user.password === u.password
        if (isUsernameMatch && isPasswordMatch) {
            const userInfo = updateUserFromLocalStorage(u.userId, u as UserModel)
            console.log('userInfo', userInfo)
            return Promise.resolve({
                success: true,
                data: {
                    accessToken: u.token,
                    user: userInfo
                },
                msg: 'messages.loginSuccess'
            })
        }
    }

    return Promise.resolve({
        success: false,
        msg: 'messages.loginFailed',
        data: null
    })
}

export async function loginByToken(token: Token): Promise<SignInType> {
    let defaultResponse = {
        success: false,
        msg: '',
        data: null
    }
    if (!token) return Promise.resolve(defaultResponse)

    for (let u of mockUsers) {
        if (u.token === token) {
            const userInfo = updateUserFromLocalStorage(u.userId, u as UserModel)
            console.log('userInfo', userInfo)
            return Promise.resolve({
                success: true,
                data: {
                    accessToken: u.token,
                    user: userInfo
                },
                msg: ''
            })
        }
    }

    return Promise.resolve(defaultResponse)
}