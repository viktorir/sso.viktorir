<template>
  <n-flex vertical align="center">
    <h1 style="margin-top: 1em;">
      <router-link to="/">SSO.viktorir</router-link>
    </h1>

    <n-divider>Login</n-divider>

    <n-form @submit.prevent="signinRouter" ref="signinForm" :model="form" :rules="rules">
      <n-form-item :label="$t('signin.login')" path="login">
        <n-input type="text" :placeholder="$t('signin.login')" :value="form.login" @input="updateLogin" required />
      </n-form-item>
      <n-form-item :label="$t('signin.password')" path="password">
        <n-input type="password" :placeholder="$t('signin.password')" :value="form.password" @input="updatePassword" required />
      </n-form-item>
      <n-form-item>
        <n-button type="primary" :disabled="isLoading" @click="signinRouter">{{ $t('signin.button') }}</n-button>
      </n-form-item>
      <n-form-item>
        <n-text>{{ $t('signin.noAccount') }} <router-link to="/signup" style="color: #5656FF;">{{ $t('signin.signup') }}</router-link></n-text>
      </n-form-item>
      <n-form-item>
        <n-text><router-link to="#" style="color: #5656FF;">{{ $t('signin.forgotPassword') }}</router-link></n-text>
      </n-form-item>
    </n-form>
  </n-flex>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import { NForm, NFormItem, NFlex, NDivider } from 'naive-ui'
export default {
  name: 'SigninView',
  components: {
    NFlex,
    NForm,
    NFormItem,
    NDivider
  },
  computed: {
    ...mapState('signIn', ['login', 'password']),
    ...mapGetters('signIn', ['isLoading', 'error']),
    form() {
      return {
        login: this.login, 
        password: this.password,
      };
    },
  },
  data() {
    return {
      rules: {
        login: [
          { required: true, message: 'Логин обязателен для заполнения', trigger: 'blur' },
          { min: 4, max: 128, message: 'Логин должен быть от 4 до 128 символов', trigger: 'blur' },
        ],
        password: [
          { required: true, message: 'Пароль обязателен для заполнения', trigger: 'blur' },
          { min: 8, max: 256, message: 'Пароль должен быть от 8 до 256 символов', trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    ...mapActions('signIn', ['signin', 'updateLogin', 'updatePassword']),
    async signinRouter() {
      try {
        await this.$refs.signinForm.validate();
        await this.signin({ router: this.$router, query: this.$route.query });
      } catch (error) {
        window.$notification.error({
          title: 'Форма невалидна!',
          content: 'Заполните все поля верно.',
          duration: 3000,
        });
      }
    },
  }
}
</script>

