<template>
  <n-flex vertical align="center" style="margin: 0 1em;">
    <n-h1 style="margin-top: 1em;"><router-link to="/">SSO.viktorir</router-link></n-h1>
    <n-text v-html="$t('home.description')" style="text-align: center;"></n-text>
    <n-divider></n-divider>
    <n-space>
      <n-card v-if="accessToken">
        <template #header>
          <n-h2>{{ $t('home.welcomeUserCard.header', {username: this.getUsername()}) }}</n-h2>
        </template>
        <n-text>{{ $t('home.welcomeUserCard.description') }}</n-text>
        <template #footer>
          <n-button type="primary" @click="$router.push('personal')">{{ $t('home.welcomeUserCard.button') }}</n-button>
        </template>
      </n-card>

      <n-card v-if="!accessToken">
        <template #header>
          <n-h2>{{ $t('home.loginCard.header') }}</n-h2>
        </template>
        <n-text>{{ $t('home.loginCard.description') }}</n-text>
        <template #footer>
          <n-button type="primary" @click="$router.push('signin')">{{ $t('home.loginCard.button') }}</n-button>
        </template>
      </n-card>

      <n-card v-if="!accessToken">
        <template #header>
          <n-h2>{{ $t('home.registerCard.header') }}</n-h2>
        </template>
        <n-text>{{ $t('home.registerCard.description') }}</n-text>
        <template #footer>
          <n-button type="primary" @click="$router.push('signup')">{{ $t('home.registerCard.button') }}</n-button>
        </template>
      </n-card>
    </n-space>
  </n-flex>
</template>

<script>
import { jwtDecode } from 'jwt-decode';
import { mapGetters } from 'vuex';
import { NSpace, NFlex, NCard, NDivider } from 'naive-ui'

export default {
  name: 'HomeView',
  components: {
    NSpace,
    NFlex,
    NCard,
    NDivider
  },
  computed: {
    ...mapGetters('auth', ['accessToken'])
  },
  methods: {
    getUsername() {
      try {
        const decodedToken = jwtDecode(this.accessToken);
        const userLogin = decodedToken.login;
        return userLogin
      } catch (error) {
        window.$notification.error({
          title: 'Ошибка авторизации!',
          content: 'Невозможно получить имя пользователя.',
          duration: 3000
        });
      }
    }
  }
}
</script>