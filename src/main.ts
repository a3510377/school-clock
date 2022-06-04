import { createApp } from 'vue';
import 'virtual:svg-icons-register';

import router from './router';

import '@/scss/main.scss';
import App from './App.vue';
import store from './stores';

createApp(App).use(router).use(store).mount('#app-mount');
