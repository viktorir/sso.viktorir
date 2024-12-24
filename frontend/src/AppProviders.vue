<template>
    <n-config-provider :theme="getTheme">
      <n-notification-provider ref="notificationProvider" placement="bottom-right" :max="5">
        <App />
      </n-notification-provider>
    </n-config-provider>
</template>

<script>
import { mapGetters } from 'vuex';
import { darkTheme, lightTheme, NConfigProvider, NNotificationProvider, } from 'naive-ui';
import App from './App.vue'
import { useI18n } from 'vue-i18n';

export default {
  components: {
    App, NConfigProvider, NNotificationProvider
  },
  setup() {
    const { locale } = useI18n();

    return {
      darkTheme,
      lightTheme,
      locale
    }
  },
  computed: {
    ...mapGetters('settings', ['theme', 'locale']),
    getTheme() {
      return this.theme === 'dark' ? darkTheme : lightTheme;
    }
  },
  
};
</script>