import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router/index.js';
import { i18n } from './i18n/index.js';
import { useThemeStore } from './stores/theme.js';
import './assets/main.css';

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(i18n);

const theme = useThemeStore();
theme.init();

app.mount('#app');
