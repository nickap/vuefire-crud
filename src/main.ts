import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { VueFire, VueFireAuth } from 'vuefire';
import { firebaseApp } from '@/firebase/firebase';

import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';

import App from './App.vue';
import router from './router';

import './assets/main.css';

const app = createApp(App);

app.component('EasyDataTable', Vue3EasyDataTable);
app.use(createPinia());
app.use(router);
app.use(VueFire, {
  firebaseApp,
  modules: [VueFireAuth()],
});
app.use(Toast, {
  position: 'bottom-center',
});

app.mount('#app');
