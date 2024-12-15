<template>
  <section v-if="services.length && !isServicesLoading">
    <h2>{{ $t('services.heading') }}</h2>
    <article v-for="service in services" :key="service.id">
      <h3>{{ service.name }}</h3>
      <p v-if="service.description"><b>{{ $t('services.description') }}:</b> {{ service.description }}</p>
      <p><b>{{ $t('services.domain') }}:</b> <a :href="'https://' + service.domain" target="_blank" rel="noopener noreferer">{{ service.domain }}</a></p>
      <p>{{ serviceRole(service.roles) }}</p>
    </article>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'UserService',
  computed: {
    ...mapGetters('personal', ['services', 'isServicesLoading', 'error'])
  },
  async created() {
    await this.$store.dispatch('personal/fetchServices')
  },
  methods: {
    serviceRole(roles) {
      if (roles.includes("is_user")) return "You a user!"
      if (roles.includes("is_admin")) return "You a admin!"
      if (roles.includes("is_moderator")) return "You a moderator!"
      return "You not a user!"
    }
  }
}
</script>

<style scoped>
section {
  padding: 32px;

  overflow-y: auto;
  scrollbar-width: none;

  display: flex;
  flex-direction: column;

  h2 {
    margin: 0;
    margin-bottom: 32px;
    text-align: start;
  }

  article {
    margin-bottom: 16px;
    padding: 4px 16px;
    border: 1px solid #FFFFFF;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    h3 {
      margin-left: 16px;
    }

    p {
      margin: 0;
      margin-bottom: 8px;
      a {
      
        text-decoration: none;
        filter: none;
        color: #5656FF;
        transition: filter 0.2s ease-in-out;
      }
    }
  }
}
</style>