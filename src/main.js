import { createApp } from 'vue';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import App from './App.vue';
import router from './router';
import './index.css';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
if (!localStorage.getItem('access_token')) {
  localStorage.setItem('access_token', process.env.VUE_APP_IMGUR_ACCESS_TOKEN);
}
library.add(faUserSecret);
const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(router).use(pinia).use(Toast).mount('#app');
