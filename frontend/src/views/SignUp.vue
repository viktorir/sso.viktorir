<template>
    <section>
      <h1 class="logo"><router-link to="/">SSO.viktorir</router-link></h1>
      <hr>
      <form @submit.prevent="signUpRouter">
        <!-- <h2>Register</h2> -->
        <input type="text" placeholder="Login" :value="login" @input="updateLogin" required>
        <input type="tel" placeholder="+7-900-1234567" :value="phoneNumber" @input="updatePhoneNumber" required>
        <input type="email" placeholder="Your@email.com" :value="email" @input="updateEmail">
        <input type="text" placeholder="Last name" :value="lastName" @input="updateLastName">
        <input type="text" placeholder="First name" :value="firstName" @input="updateFirstName">
        <input type="text" placeholder="Father name" :value="fatherName" @input="updateFatherName">

        <input type="password" placeholder="Password" :value="password" @input="updatePassword" required>
        <input type="password" placeholder="Repeat your password" :value="passwordRepeat" @input="updatePasswordRepeat" required>
        <button type="submit">Sign Up</button>
        <p>Do you already have an account? <router-link to="/signin">SignIn now!</router-link></p>
      </form>
    </section>
  </template>
  
  <script>
  import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';
  export default {
    name: 'SignUp',
    computed: {
      ...mapState('signUp', ['login', 'password', 'email', 'phoneNumber', 'lastName', 'firstName', 'fatherName', 'passwordRepeat']),
      ...mapGetters('signUp', ['isLoading', 'error'])
    },
    methods: {
      ...mapMutations('signUp', ['SET_LOGIN', 'SET_PASSWORD', 'SET_PHONE_NUMBER', 'SET_EMAIL', 'SET_LAST_NAME', 'SET_FIRST_NAME', 'SET_FATHER_NAME', 'SET_PASSWORD_REPEAT']),
      ...mapActions('signUp', ['signup']),
      async signUpRouter() {
        await this.signup(this.$router)
      },
      updateLogin(event) {
        this.SET_LOGIN(event.target.value)
      },
      updatePhoneNumber(event) {
        this.SET_PHONE_NUMBER(event.target.value)
      },
      updateEmail(event) {
        this.SET_EMAIL(event.target.value)
      },
      updateLastName(event) {
        this.SET_LAST_NAME(event.target.value)
      },
      updateFirstName(event) {
        this.SET_FIRST_NAME(event.target.value)
      },
      updateFatherName(event) {
        this.SET_FATHER_NAME(event.target.value)
      },
      updatePassword(event) {
        this.SET_PASSWORD(event.target.value)
      },
      updatePasswordRepeat(event) {
        this.SET_PASSWORD_REPEAT(event.target.value)
      },
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
          margin-bottom: 1em;
          padding: 0.3em 2em;
  
          min-width: max-content;
          max-width: 50%;
  
          font-size: 1.5em;
          color: $color-text-dark;
  
          background-color: $color-bg-dark;
          border: 2px solid $color-text-dark;
          border-radius: 10px;
        } 
        input:required:hover {
            border: 2px solid red;
        }
        input:required:hover:not(:placeholder-shown) {
            border: 2px solid green;
        }
  
        button {
          margin: 1em 0;
          padding: 0.4em 3em;
  
          font-size: 1.5em;
          color: $color-text-dark;
  
          background-color: $color-accent-dark;
  
          border: none;
          border-radius: 30px;
        }
      }
    }
  </style>