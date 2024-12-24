<template>
  <n-flex vertical align="center">
    <n-h1 style="margin-top: 1em;">
      <router-link to="/">SSO.viktorir</router-link>
    </n-h1>

    <n-divider>Registration</n-divider>
    
    <n-form @submit.prevent="signUpRouter" ref="signUpForm" :model="form" :rules="rules">
      <n-form-item :label="$t('signup.login')" path="login">
        <n-input type="text" :placeholder="$t('signup.login')" v-model:value="form.login" @update:value="updateLogin" clearable required />
      </n-form-item>
      <n-form-item :label="$t('signup.phoneNumber')" path="phoneNumber">
        <n-input type="tel" :placeholder="$t('signup.phoneNumber')" v-model:value="form.phoneNumber" @update:value="updatePhoneNumber" required />
      </n-form-item>
      <n-form-item :label="$t('signup.email')" path="email">
        <n-auto-complete type="email" :placeholder="$t('signup.email')" v-model:value="form.email" @update:value="updateEmail" :options="emailSuggestions" autocomplete="email" />
      </n-form-item>
      <n-form-item :label="$t('signup.password')" path="password">
        <n-input type="password" :placeholder="$t('signup.password')" v-model:value="form.password" @update:value="updatePassword" required />
      </n-form-item>
      <n-form-item :label="$t('signup.passwordRepeat')" path="passwordRepeat">
        <n-input type="password" :placeholder="$t('signup.passwordRepeat')" v-model:value="form.passwordRepeat" @update:value="updatePasswordRepeat" required />
      </n-form-item>
      <n-form-item>
        <n-button type="primary" :disabled="isLoading" @click="signUpRouter">{{ $t('signup.button') }}</n-button>
      </n-form-item>
      <n-form-item>
        <n-text>{{ $t('signup.alreadyAccount') }} <router-link to="/signin" style="color: #5656FF;">{{ $t('signup.signin') }}</router-link></n-text>
      </n-form-item>
    </n-form>
  </n-flex>
</template>
  
<script>
  import { mapState, mapGetters, mapActions } from 'vuex';
  import { NFlex, NForm, NFormItem, NDivider, NAutoComplete } from "naive-ui";

  export default {
    name: 'SignUp',
    components: {
      NFlex,
      NForm, 
      NFormItem, 
      NDivider,
      NAutoComplete
    },
    computed: {
      ...mapState('signUp', ['login', 'password', 'email', 'phoneNumber', 'lastName', 'firstName', 'fatherName', 'passwordRepeat']),
      ...mapGetters('signUp', ['isLoading', 'error']),
      form() {
        return {
          login: this.login,
          phoneNumber: this.phoneNumber,
          email: this.email,
          password: this.password,
          passwordRepeat: this.passwordRepeat,
        };
      },
      emailSuggestions() {
        const email = this.form.email || "";
        const prefix = email.split("@")[0] || "";
        return ["@gmail.com", "@yandex.ru", "@mail.ru"].map((suffix) => {
          return {
            label: prefix + suffix,
            value: prefix + suffix,
          };
        })
      }
    },
    data() {
      return {
        rules: {
          login: [
            { required: true, message: "Логин обязателен для заполнения", trigger: "blur" },
            { min: 4, max: 128, message: "Логин должен быть от 4 до 128 символов", trigger: "blur" },
          ],
          phoneNumber: [
            { required: true, message: "Номер телефона обязателен", trigger: "blur" },
            { 
              pattern: /^7\d{10}$/, 
              message: "Формат номера: 7XXXXXXXXXX", 
              trigger: "blur" 
            },
          ],
          email: [
            { 
              type: "email", 
              message: "Введите корректный email", 
              trigger: ["blur", "input"],
            },
          ],
          password: [
            { required: true, message: "Пароль обязателен", trigger: "blur" },
            { min: 8, max: 256, message: "Пароль должен быть от 8 до 256 символов", trigger: "blur" },
          ],
          passwordRepeat: [
            { required: true, message: "Повторите пароль", trigger: "blur" },
            { 
              validator: (rule, value, callback) => {
                if (value !== this.password) {
                  callback(new Error("Пароли не совпадают"));
                } else {
                  callback();
                }
              }, 
              trigger: "blur",
            },
          ],
        },
      };
    },
    methods: {
      ...mapActions('signUp', ['signup', 'updateLogin', 'updatePhoneNumber', 'updateEmail', 'updateLastName', 'updateFirstName', 'updateFatherName', 'updatePassword', 'updatePasswordRepeat']),
      async signUpRouter() {
        try {
          await this.$refs.signUpForm.validate(); // Если форма невалидна - выплёвываем ошибку, нехочу делать отдельную функцию
          await this.signup(this.$router);
        } catch (error) {
          window.$notification.error({
            title: 'Форма невалидна!',
            content: 'Заполните все поля верно.',
            duration: 3000
          });
        }
      },
    }
  }
</script>
  