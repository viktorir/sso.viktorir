<template>
  <div id="home">
    <h1><router-link to="/">SSO.viktorir</router-link></h1>
    <p v-html="$t('home.description')"></p>
    <section id="cards">
      <article v-if="accessToken" class="card" id="personal">
        <h2>{{ $t('home.welcomeUserCard.header', {username: this.getUsername()}) }}</h2>
        <p>{{ $t('home.welcomeUserCard.description') }}</p>
        <button @click="$router.push('personal')">{{ $t('home.welcomeUserCard.button') }}</button>
      </article>

      <article v-if="!accessToken" class="card" id="signin">
        <h2>{{ $t('home.loginCard.header') }}</h2>
        <p>{{ $t('home.loginCard.description') }}</p>
        <button @click="$router.push('signin')">{{ $t('home.loginCard.button') }}</button>
      </article>

      <article v-if="!accessToken" class="card" id="signup">
        <h2>{{ $t('home.registerCard.header') }}</h2>
        <p>{{ $t('home.registerCard.description') }}</p>
        <button @click="$router.push('signup')">{{ $t('home.registerCard.button') }}</button>
      </article>
    </section>
  </div>
</template>

<script>
import { jwtDecode } from 'jwt-decode';
import { mapGetters } from 'vuex';

export default {
  name: 'HomeView',
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
        console.log(this.accessToken)
      }
    }
  }
}
</script>

<style lang="scss">
  $color-bg-dark: #1C1C1C;
  $color-text-dark: #FFFFFF;
  $color-accent-dark: #E31C25;
  $color-link-dark: #5656FF;

  #home {
    margin: 0 5%;
    width: 90%;
    height: 100%;

    display: flex;
    flex-flow: column nowrap;
    align-items: center;

    h1 {
      margin: 0;
      margin-top: 0.5em;

      font-size: 6em;

      a {
        color: $color-text-dark;
      }
    }

    p {
      font-size: 1.5em;
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

    b {
      transition: font-size 0.2s ease-in-out;
    }

    b:hover {
      font-size: 1.1em;
    }

    section#cards {
      margin: auto auto;
      
      width: 100%;
      height: 28em;

      display: flex;
      flex-flow: row nowrap;
      justify-content: center;

      article {
        margin: 0 2em;
        padding: 1em;

        width: 24em;

        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        justify-content: space-between;

        box-shadow: 0px 0px 8px 0px $color-text-dark;
        border-radius: 30px;

        h2 {
          margin: 0.5em 0;
          font-size: 3em;
        }

        p {
          margin: 0.5em 1em;
          font-size: 1.5em;
        }

        button {
          margin: 0.5em 0;
          padding: 0.2em 1em;

          color: $color-text-dark;
          font-size: 2em;

          background-color: $color-accent-dark;
          border: none;
          border-radius: 30px;
        }
      }
    }
  }
</style>
