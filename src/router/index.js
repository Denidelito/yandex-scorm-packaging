import {createMemoryHistory, createRouter} from "vue-router";

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('../views/page-1.vue')
    },
    {
        path: '/page-2',
        name: 'page-2',
        component: () => import('../views/page-2.vue')
    }
]

const router  =  createRouter({
    history: createMemoryHistory(),
    routes
});

export default router