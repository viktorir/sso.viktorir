<template>
  <section>
    <h1 class="logo"><router-link to="/">SSO.viktorir</router-link></h1>
    <hr>
    <form @submit.prevent="signinRouter">
      <!-- <h2>Login</h2> -->
      <input type="text" :placeholder="$t('signin.login')" :value="login" @input="updateLogin" required>
      <input type="password" :placeholder="$t('signin.password')" :value="password" @input="updatePassword" required>
      <button type="submit" :disabled="isLoading">{{ $t('signin.button') }}</button>
      <p>{{ $t('signin.noAccount') }} <router-link to="/signup">{{ $t('signin.signup') }}</router-link></p>
      <a href="#">{{ $t('signin.forgotPassword') }}</a>
    </form>
  </section>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';
export default {
  name: 'SigninView',
  computed: {
    ...mapState('signIn', ['login', 'password']),
    ...mapGetters('signIn', ['isLoading', 'error'])
  },
  methods: {
    ...mapMutations('signIn', ['SET_LOGIN', 'SET_PASSWORD']),
    ...mapActions('signIn', ['signin']),
    async signinRouter() {
      console.log(this.$route.query)
      await this.signin({ 
        router: this.$router, 
        querys: this.$route.query 
      });
    },
    updateLogin(event) {
      this.SET_LOGIN(event.target.value);
    },
    updatePassword(event) {
      this.SET_PASSWORD(event.target.value);
    }
  }
}
</script>

<style lang="scss" scoped>
  section {
    $color-bg-dark: #1C1C1C;
    $color-text-dark: #FFFFFF;
    $color-accent-dark: #E31C25;
    $color-link-dark: #5656FF;

    margin: 4em 2em;

    height: 100%;

    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;

    h1 {
      margin: auto;

      flex: 1;

      font-size: 6em;

      a {
        color: $color-text-dark;
      }
    }

    a {
      text-decoration: none;
      filter: none;
      color: $color-link-dark;
      transition: filter 0.2s ease-in-out;
    }

    a:hover {
      filter: drop-shadow(0px 4px 4px #E31C25);
    }

    a:active {
      filter: drop-shadow(0px 4px 0px #E31C25);
    }

    hr {
      margin: 0 1em;
      flex-shrink: 0;

      border: 2px solid $color-accent-dark;
      border-radius: 30px;
    }

    form {
      margin: auto;

      display: flex;
      flex-flow: column nowrap;
      align-items: center;

      flex: 1;

      input {
        margin-bottom: 2em;
        padding: 0.3em 2em;

        min-width: max-content;
        max-width: 50%;

        font-size: 1.5em;
        color: $color-text-dark;

        background-color: $color-bg-dark;
        border: 2px solid $color-text-dark;
        border-radius: 10px;
      } 

      button {
        margin: 1em 0;
        padding: 0.4em 3em;

        font-size: 1.5em;
        color: $color-text-dark;

        background-color: $color-accent-dark;

        border: none;
        border-radius: 30px;

        transition: background-color 0.2s ease, color 0.2s ease; 
      }

      button:disabled {
        background-color: #D4A1A0;
      }
    }
  }
</style>