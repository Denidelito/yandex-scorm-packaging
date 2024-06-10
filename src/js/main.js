import { createApp } from 'vue'
import '../style/fonts.css'
import '../style/style.css'
import animate from 'animate'
import App from '../App.vue'
import  router  from  '../router'
import { createPinia } from 'pinia'

// Register SVG icons
import 'virtual:svg-icons-register'

const  pinia  =  createPinia();

createApp(App).use(router).use(pinia).mount('#app');
