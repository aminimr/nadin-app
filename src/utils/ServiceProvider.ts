import type {
    AxiosError,
    AxiosInstance
} from 'axios';
import axios from 'axios';
import {useNotification} from "@/utils/NotificationManager";
import i18n from '@/i18n'
import {useAuthStore} from "@/stores/auth";

type ErrorType = 'axios' | 'stack'

type RequestError = {
    msg?: string,
    status: number,
    data?: any,
    type: ErrorType
}

class ServiceProvider {
    public readonly http: AxiosInstance;

    constructor() {
        this.http = axios.create({
            baseURL: import.meta.env.VITE_BASE_URL,
            timeout: 5000
        });
        this.http.defaults.headers.common['Accept'] = 'application/json;charset=UTF-8';
        this.http.defaults.headers.common['Content-Type'] = 'application/json;charset=UTF-8';

        this.http.interceptors.request.use(null, this.errorHandle)
        this.http.interceptors.response.use(null, this.errorHandle)
    }

    protected errorHandle(error: AxiosError | Error): Promise<AxiosError> {
        const {t} = i18n.global
        const authStore = useAuthStore()
        const {showError} = useNotification()
        let result: RequestError = {
            msg: '',
            status: -1,
            data: error,
            type: 'stack'
        }

        if (axios.isAxiosError(error)) {
            result.msg = error.message
            result.type = 'axios'
            if (error.request) result.status = error.request.status
            if (error.response) result.status = error.response.status

            switch (result.status) {
                case 400: { // "Bad Request"
                    showError(t('messages.bad_request'))
                    break;
                }
                case 401: { // "Login required"
                    authStore.clearSession()
                    showError(t('messages.unauthorized'))
                    break;
                }
                case 403: { // "Permission denied"
                    showError(t('messages.forbidden'))
                    break;
                }
                case 404: { // "Invalid request"
                    showError(t('messages.not_found'))
                    break;
                }
                case 500: { // "Server error"
                    showError(t('messages.server_error'))
                    break;
                }
                default: {
                    showError(t('messages.server_error'))
                    // "Unknown error occurred"
                    break;
                }
            }
        } else {
            result.type = 'stack'
        }

        return Promise.reject(result);
    };
}

let instance = new ServiceProvider()

export const useApi = () => instance