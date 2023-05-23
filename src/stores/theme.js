import {defineStore} from 'pinia'
import {ref} from 'vue'
import { ConfigProvider } from 'ant-design-vue';

export const useThemeStore = defineStore('theme', () => {
    const DEFAULT_THEME = 'blue'
    const allowedThemes = ['green', 'blue', 'yellow']
    const theme = ref('')

    function initTheme(){
        changeTheme(DEFAULT_THEME)
    }
    function changeTheme(value) {
        if (!allowedThemes.includes(value)) return
        theme.value = value

        const colors = {
            yellow: '#f59e0b',
            green: '#22c55e',
            blue: '#2563eb'
        }

        ConfigProvider.config({
            theme: {
                primaryColor: colors[theme.value],
            },
        });
    }

    function resetTheme() {
        theme.value = DEFAULT_THEME
    }

    return {
        // states
        DEFAULT_THEME,
        theme,
        allowedThemes,

        // actions
        changeTheme,
        initTheme,
        resetTheme
    }
})