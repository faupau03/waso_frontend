import {
    createRouter,
    createWebHistory
} from 'vue-router'
import Home from '/src/components/Home.vue'
import User from '/src/components/User.vue'
import Game from '/src/components/Game.vue'

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