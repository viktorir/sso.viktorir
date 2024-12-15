import '@/assets/fonts/inter.css'
import { createApp } from 'vue'
import VueCookies from 'vue-cookies'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'

createApp(App).
  use(VueCookies).
  use(store).
  use(router).
  use(i18n).
  mount('#app')
