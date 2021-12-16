import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from "./router/index"
import { BootstrapIconsPlugin } from 'bootstrap-icons-vue';

import VueClickAway from "vue3-click-away";

const app = createApp(App)
app.use(router)
app.use(BootstrapIconsPlugin)

// For debugging purposes
app.config.globalProperties.$log = console.log

app.use(VueClickAway)

app.mount('#app');
