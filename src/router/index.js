import {createMemoryHistory, createRouter} from "vue-router";

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('../views/splash.vue')
    },
    {
        path: '/slide-1',
        name: 'slide-1',
        component: () => import('../views/page-1.vue')
    },
    {
        path: '/slide-2',
        name: 'slide-2',
        component: () => import('../views/page-2.vue')
    },
    {
        path: '/slide-3',
        name: 'slide-3',
        component: () => import('../views/page-3.vue')
    }
]

const router  =  createRouter({
    history: createMemoryHistory(),
    routes
});

export default router