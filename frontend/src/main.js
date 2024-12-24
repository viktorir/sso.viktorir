import '@/assets/fonts/inter.css'
import { create, NButton, NInput, NH1, NH2, NH3, NText, NIcon} from 'naive-ui';
import { createApp } from 'vue'
import VueCookies from 'vue-cookies'
import router from './router'
import store from './store'
import i18n from './i18n'
import 'vfonts/Inter.css'
import AppProviders from './AppProviders.vue';
import VueTheMask from 'vue-the-mask';

const naive = create({
  components: [NButton, NInput, NH1, NH2, NH3, NText, NIcon ], // Зарегистрируйте нужные компоненты
});

createApp(AppProviders).
  use(VueCookies).
  use(store).
  use(naive).
  use(router).
  use(i18n).
  use(VueTheMask).
  mount('body')
  
