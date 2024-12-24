<template>
  <n-layout style="min-height: 100vh; display: flex; flex-direction: column;">
    <n-layout-header bordered style="display: flex; flex-direction: row-reverse; align-items: center; gap: 1em; padding: 8px 16px;" >
      <n-button-group>
        <n-button @click="setLocale('ru')" :type="locale === 'ru' ? 'primary' : 'default'">
          Ru
        </n-button>
        <n-button @click="setLocale('en')" :type="locale === 'en' ? 'primary' : 'default'">
          En
        </n-button>
      </n-button-group>

      <n-button-group>
        <n-button @click="setTheme('dark')" :type="theme == 'dark' ? 'primary' : 'default'">
          <template #icon>
            <n-icon><moon-outline /></n-icon>
          </template>
        </n-button>
        <n-button @click="setTheme('light')" :type="theme == 'light' ? 'primary' : 'default'">
          <template #icon>
            <n-icon><sunny-outline /></n-icon>
          </template>
        </n-button>
      </n-button-group>
    </n-layout-header>

    <n-layout-content style="height: calc(100vh - 74px); display: flex;" > 
      <router-view/>
    </n-layout-content>

    <n-layout-footer bordered style="display: flex; justify-content: center;">
      © 2024-2025 sso.viktorir. All rights reserved.
    </n-layout-footer>
  </n-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { NLayout, NLayoutHeader, NLayoutFooter, NLayoutContent, NButtonGroup, useNotification } from 'naive-ui';
import { MoonOutline, SunnyOutline } from '@vicons/ionicons5';

export default {
  components: {
    NLayout, 
    NLayoutFooter,
    NLayoutHeader,
    NLayoutContent,
    NButtonGroup, 
    MoonOutline, 
    SunnyOutline,
  },
  setup() {
    const notification = useNotification();
    window.$notification = notification;
    return {
      notification
    }
  },
  computed: {
    ...mapGetters('settings', ['theme', 'locale']),
  },
  methods: {
    ...mapActions('settings', ['setTheme', 'setLocale']),
    ...mapActions('auth', ['checkAuthorization']),
  },
  watch: {
    locale(newLocale) {
      this.$i18n.locale = newLocale;
    },
  },
}
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  
}

a:active,
a:hover,  
a {
  text-decoration: inherit;
  color: inherit;
}

.n-layout-scroll-container {
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%; 
}
</style>
