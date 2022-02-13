import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import translations from './translations';

const app = createApp(App);
app.use(createPinia());
app.use(translations);
app.mount('#app');
