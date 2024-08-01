import { createApp } from 'vue'
import '../style/fonts.css'
import '../style/style.css'
import 'animate.css';
import App from '../App.vue'
import  router  from  '../router'
import { createPinia } from 'pinia'


// Register SVG icons
import 'virtual:svg-icons-register'

// Custom scrollbar
import CustomScrollbar from 'custom-vue-scrollbar';
import 'custom-vue-scrollbar/dist/style.css';
 
const  pinia  =  createPinia();

const app = createApp(App);
app.use(router).use(pinia)
app.component('CustomScrollbar',
    CustomScrollbar
)
app.mount('#app');
