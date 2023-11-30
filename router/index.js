import {createRouter, createWebHistory} from 'vue-router'
import mainPage from '../components/mainPage.vue'
import Login from '../components/Login.vue'

const routes = [
    {
        path: '/mainPage',
        name: 'mainPage',
        component:mainPage
    },
    {
        path: '/Login',
        name: 'Login',
        component:Login
    },
    { path: '/', redirect: '/login' },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router