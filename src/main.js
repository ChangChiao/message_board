import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './index.css';
import { createPinia } from 'pinia';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faUserSecret);
const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(router).use(createPinia()).mount('#app');
