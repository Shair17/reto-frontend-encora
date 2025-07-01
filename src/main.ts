// styles
import './assets/main.css';
import 'vue-sonner/style.css';

// core
import { createApp } from 'vue';
import { createPinia } from 'pinia';

// plugins
import { VueQueryPlugin } from '@tanstack/vue-query';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

// components
import App from './App.vue';
import router from './router';

// create app
const app = createApp(App);

// create pinia
const pinia = createPinia();

// pinia plugins
pinia.use(piniaPluginPersistedstate);

// app plugins
app.use(pinia);
app.use(router);
app.use(VueQueryPlugin, {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  },
});

// hooks
router.beforeEach((to, from, next) => {
  if (document.startViewTransition) {
    document.startViewTransition(() => next());
  } else {
    next();
  }
});

// app mount
app.mount('#app');
