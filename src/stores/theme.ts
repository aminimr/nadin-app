import {defineStore} from 'pinia'
import {ref} from 'vue'
import {ConfigProvider} from 'ant-design-vue';


export const useThemeStore = defineStore('theme', () => {
    const colors: Record<string, string> = {
        yellow: '#f59e0b',
        green: '#22c55e',
        blue: '#2563eb',
        purple: '#6318fa'
    }
    const DEFAULT_THEME = 'blue'
    const allowedThemes = Object.keys(colors)
    const theme = ref<string>('')

    function initTheme() {
        changeTheme(DEFAULT_THEME)
    }

    function changeTheme(value: string | undefined) {
        if (!value || !allowedThemes.includes(value)) return
        theme.value = value

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
        colors,

        // actions
        changeTheme,
        initTheme,
        resetTheme
    }
})