<template>
  <router-view/>
  <PopupManager />
</template>

<script>
import PopupManager from '@/components/PopupManager.vue';

export default {
  components: {
    PopupManager
  },
  inject: ['$cookies'],
  created() {
    if (!this.$cookies) {
      this.$cookies = this.$root.$cookies;
    }
  },
  provide() {
    return {
      $cookies: this.$cookies
    }
  },
  
}
</script>

<style lang="scss">
  $color-bg-dark: #1C1C1C;
  $color-text-dark: #FFFFFF;
  $color-accent-dark: #E31C25;

  html, body {
    margin: 0;
    height: 100%;
  }

  body {
    display: flex;
    flex-direction: column;

    background-color: $color-bg-dark;
  }

  #app {
    height: 100%;

    display: flex;
    flex-direction: column;

    font-family: 'Inter', sans-serif;
    
    text-align: center;
    color: $color-text-dark;
  }
</style>
