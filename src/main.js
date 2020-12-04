import { createApp } from 'vue';
import { VuelidatePlugin } from '@vuelidate/core';
import axios from 'axios';
import VueAxios from 'vue-axios';
import router from './router';
import App from './App.vue';

import store from './store';
import './bootstrap';

createApp(App)
  .use(router)
  .use(VuelidatePlugin)
  .use(VueAxios, axios)
  .use(store)
  .mount('#app');
