import {createMemoryHistory, createRouter} from "vue-router";

const routes = [
    {
        path: '/',
        name: 'Заставка',
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
    },
    {
        path: '/slide-4',
        name: 'slide-4',
        component: () => import('../views/page-4.vue')
    },
    /*
    {
        path: '/slide-67',
        name: 'slide-67',
        component: () => import('../views/page-67.vue')
    },*/
    // Этапы формирования группы
    {
        path: '/splash-1',
        name: 'splash-1',
        component: () => import('../views/splash-1.vue')
    },
    {
        path: '/slide-6',
        name: 'slide-6',
        component: () => import('../views/page-6.vue')
    },
    {
        path: '/slide-7',
        name: 'slide-7',
        component: () => import('../views/page-7.vue')
    },
    // Формирующая стадия
    {
        path: '/splash-2',
        name: 'splash-2',
        component: () => import('../views/splash-2.vue')
    },
    {
        path: '/slide-8',
        name: 'slide-8',
        component: () => import('../views/page-8.vue')
    },
    {
        path: '/slide-9',
        name: 'slide-9',
        component: () => import('../views/page-9.vue')
    },
    // Практическое задание со шкалами
    {
        path: '/trening-1',
        name: 'trening-1',
        component: () => import('../views/trening-1.vue')
    },
    // Конфликтная стадия
    {
        path: '/splash-3',
        name: 'splash-3',
        component: () => import('../views/splash-3.vue')
    },
    {
        path: '/slide-10',
        name: 'slide-10',
        component: () => import('../views/page-10.vue')
    },
    {
        path: '/slide-11',
        name: 'slide-11',
        component: () => import('../views/page-11.vue')
    },
    // Практическое задание со шкалами
    {
        path: '/trening-2',
        name: 'trening-2',
        component: () => import('../views/trening-2.vue')
    },
    // Стадия нормализации
    {
        path: '/splash-4',
        name: 'splash-4',
        component: () => import('../views/splash-4.vue')
    },
    {
        path: '/slide-12',
        name: 'slide-12',
        component: () => import('../views/page-12.vue')
    },
    {
        path: '/slide-13',
        name: 'slide-13',
        component: () => import('../views/page-13.vue')
    },
    // Стадия функционирования
    {
        path: '/splash-5',
        name: 'splash-5',
        component: () => import('../views/splash-5.vue')
    },
    {
        path: '/slide-14',
        name: 'slide-14',
        component: () => import('../views/page-14.vue')
    },
    {
        path: '/slide-15',
        name: 'slide-15',
        component: () => import('../views/page-15.vue')
    },
    // Стадия расставания
    {
        path: '/splash-6',
        name: 'splash-6',
        component: () => import('../views/splash-6.vue')
    },
    {
        path: '/slide-16',
        name: 'slide-16',
        component: () => import('../views/page-16.vue')
    },
    {
        path: '/slide-17',
        name: 'slide-17',
        component: () => import('../views/page-17.vue')
    },
    {
        path: '/slide-18',
        name: 'slide-18',
        component: () => import('../views/page-18.vue')
    },
    // Практика на перетаскивание
    {
        path: '/slide-33',
        name: 'slide-33',
        component: () => import('../views/page-33.vue')
    },
    {
        path: '/slide-19',
        name: 'slide-19',
        component: () => import('../views/page-19.vue')
    },
    // Андрагогика
    {
        path: '/splash-7',
        name: 'splash-7',
        component: () => import('../views/splash-7.vue')
    },
    {
        path: '/slide-20',
        name: 'slide-20',
        component: () => import('../views/page-20.vue')
    },
    {
        path: '/slide-21',
        name: 'slide-21',
        component: () => import('../views/page-21.vue')
    },
    // Принципы андрагогики
    {
        path: '/slide-22',
        name: 'slide-22',
        component: () => import('../views/page-22.vue')
    },
    {
        path: '/slide-23',
        name: 'slide-23',
        component: () => import('../views/page-23.vue')
    },
    {
        path: '/slide-24',
        name: 'slide-24',
        component: () => import('../views/page-24.vue')
    },
    {
        path: '/slide-25',
        name: 'slide-25',
        component: () => import('../views/page-25.vue')
    },
    {
        path: '/slide-26',
        name: 'slide-26',
        component: () => import('../views/page-26.vue')
    },
    // Роли тренера
    {
        path: '/splash-8',
        name: 'splash-8',
        component: () => import('../views/splash-8.vue')
    },
    {
        path: '/slide-27',
        name: 'slide-27',
        component: () => import('../views/page-27.vue')
    },
    {
        path: '/slide-28',
        name: 'slide-28',
        component: () => import('../views/page-28.vue')
    },
    {
        path: '/slide-29',
        name: 'slide-29',
        component: () => import('../views/page-29.vue')
    },
    {
        path: '/slide-30',
        name: 'slide-30',
        component: () => import('../views/page-30.vue')
    },
    {
        path: '/slide-31',
        name: 'slide-31',
        component: () => import('../views/page-31.vue')
    },
    {
        path: '/slide-32',
        name: 'slide-32',
        component: () => import('../views/page-32.vue')
    },
    // Практика перетаскивание
    {
        path: '/slide-34',
        name: 'slide-34',
        component: () => import('../views/page-34.vue')
    },
    {
        path: '/slide-35',
        name: 'slide-35',
        component: () => import('../views/page-35.vue')
    },
    // Роли тренера
    {
        path: '/splash-9',
        name: 'splash-9',
        component: () => import('../views/splash-9.vue')
    },
    {
        path: '/slide-36',
        name: 'slide-36',
        component: () => import('../views/page-36.vue')
    },
    {
        path: '/slide-37',
        name: 'slide-37',
        component: () => import('../views/page-37.vue')
    },
    {
        path: '/slide-38',
        name: 'slide-38',
        component: () => import('../views/page-38.vue')
    },
    {
        path: '/slide-39',
        name: 'slide-39',
        component: () => import('../views/page-39.vue')
    },
    // Практика перетаскивание
    {
        path: '/slide-40',
        name: 'slide-40',
        component: () => import('../views/page-40.vue')
    },
    {
        path: '/slide-66',
        name: 'slide-66',
        component: () => import('../views/page-66.vue')
    },
    {
        path: '/slide-41',
        name: 'slide-41',
        component: () => import('../views/page-41.vue')
    },
    // Роли тренера на перетаскивание
    {
        path: '/splash-10',
        name: 'splash-10',
        component: () => import('../views/splash-10.vue')
    },
    {
        path: '/slide-42',
        name: 'slide-42',
        component: () => import('../views/page-42.vue')
    },
    {
        path: '/slide-43',
        name: 'slide-43',
        component: () => import('../views/page-43.vue')
    },
    {
        path: '/slide-44',
        name: 'slide-44',
        component: () => import('../views/page-44.vue')
    },
    {
        path: '/slide-45',
        name: 'slide-45',
        component: () => import('../views/page-45.vue')
    },
    {
        path: '/slide-46',
        name: 'slide-46',
        component: () => import('../views/page-46.vue')
    },
    {
        path: '/slide-47',
        name: 'slide-47',
        component: () => import('../views/page-47.vue')
    },
    // Практическое задание на перетаскивание
    {
        path: '/slide-48',
        name: 'slide-48',
        component: () => import('../views/page-48.vue')
    },
    // Факторы сплочённости
    {
        path: '/splash-11',
        name: 'splash-11',
        component: () => import('../views/splash-11.vue')
    },
    {
        path: '/slide-49',
        name: 'slide-49',
        component: () => import('../views/page-49.vue')
    },
    {
        path: '/slide-50',
        name: 'slide-50',
        component: () => import('../views/page-50.vue')
    },
    {
        path: '/slide-51',
        name: 'slide-51',
        component: () => import('../views/page-51.vue')
    },
    // Практическое задание на перетаскивание
    {
        path: '/slide-52',
        name: 'slide-52',
        component: () => import('../views/page-52.vue')
    },
    {
        path: '/slide-53',
        name: 'slide-53',
        component: () => import('../views/page-53.vue')
    },
    {
        path: '/splash-12',
        name: 'splash-12',
        component: () => import('../views/splash-12.vue')
    },
    {
        path: '/slide-54',
        name: 'slide-54',
        component: () => import('../views/page-54.vue')
    },
    {
        path: '/slide-55',
        name: 'slide-55',
        component: () => import('../views/page-55.vue')
    },
    {
        path: '/slide-57',
        name: 'slide-57',
        component: () => import('../views/page-57.vue')
    },
    // Инстументы
    {
        path: '/splash-13',
        name: 'splash-13',
        component: () => import('../views/splash-13.vue')
    },
    {
        path: '/slide-58',
        name: 'slide-58',
        component: () => import('../views/page-58.vue')
    },
    {
        path: '/slide-59',
        name: 'slide-59',
        component: () => import('../views/page-59.vue')
    },
    {
        path: '/slide-60',
        name: 'slide-60',
        component: () => import('../views/page-60.vue')
    },
    {
        path: '/slide-61',
        name: 'slide-61',
        component: () => import('../views/page-61.vue')
    },
    {
        path: '/slide-62',
        name: 'slide-62',
        component: () => import('../views/page-62.vue')
    },
    // Тайминг
    {
        path: '/splash-14',
        name: 'splash-14',
        component: () => import('../views/splash-14.vue')
    },
    {
        path: '/slide-65',
        name: 'slide-65',
        component: () => import('../views/page-65.vue')
    },
    {
        path: '/slide-63',
        name: 'slide-63',
        component: () => import('../views/page-63.vue')
    },
    {
        path: '/slide-64',
        name: 'slide-64',
        component: () => import('../views/page-64.vue')
    },
]

const router  =  createRouter({
    history: createMemoryHistory(),
    routes
});

export default router