import Vue from 'vue';
import App from './App.vue';
import dotenv from 'dotenv';
dotenv.config()

import router from './router';

Vue.config.productionTip = false;
import './css/index.scss';

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app');