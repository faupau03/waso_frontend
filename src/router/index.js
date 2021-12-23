import {
    createRouter,
    createWebHistory
} from 'vue-router'
import Home from '/src/components/Home/Main.vue'
import User from '/src/components/User/Main.vue'
import Game from '/src/components/Game/Main.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/user',
        name: 'User',
        component: User,
    },
    {
        path: '/game',
        name: 'Game',
        component: Game,
    }, 
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})
export default router