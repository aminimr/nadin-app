import {createRouter, createWebHistory} from 'vue-router'
import {useAuthStore} from "@/stores/auth";

import Dashboard from '../views/Dashboard.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.VITE_BASE),
    routes: [
        {
            path: '/',
            name: 'dashboard',
            component: Dashboard
        },
        {
            path: '/weather',
            name: 'weather',
            component: () => import('../views/Weather.vue')
        },
        {
            path: '/todos',
            name: 'todos',
            component: () => import('../views/Todos.vue')
        },
        {
            path: '/Profile',
            name: 'profile',
            component: () => import('../views/Profile.vue')
        },
        {
            path: '/login',
            name: 'login',
            meta: {
                public: true,
            },
            component: () => import('../views/Login.vue')
        },
        {
            path: '/home',
            name: 'home',
            meta: {
                public: true,
            },
            component: () => import('../views/Home.vue')
        }
    ]
})

router.beforeEach(async (to, from, next) => {
    const auth = useAuthStore()

    if(!auth.isLoggedIn) await auth.silentlyLogin(localStorage.token)

    if (auth.isLoggedIn || !!to.meta.public) return next()

    return next({path: 'login'})
})
export default router