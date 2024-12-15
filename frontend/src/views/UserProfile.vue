<template>
  <section>
    <h2>{{ $t('profile.heading') }}</h2>
    <article>
      <p>{{ $t('profile.username') }}</p>
      <div class="info-box">{{ user.login }}</div>
    </article>
    <article>
      <p>{{ $t('profile.lastName') }}</p>
      <div class="info-box">{{ user.last_name }}</div>
    </article>
    <article>
      <p>{{ $t('profile.firstName') }}</p>
      <div class="info-box">{{ user.first_name }}</div>
    </article>
    <article>
      <p>{{ $t('profile.fatherName') }}</p>
      <div class="info-box">{{ user.father_name }}</div>
    </article>
    <article>
      <p>{{ $t('profile.phoneNumber') }}</p>
      <div class="info-box">{{ user.phone_number }}</div>
    </article>
    <article>
      <p>{{ $t('profile.email') }}</p>
      <div class="info-box">{{ user.email }}</div>
    </article> 
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'UserProfile',
    computed: {
      ...mapGetters('personal', ['user', 'isLoading', 'error'])
    }
}
</script>

<style scoped>
section {
  padding: 32px;

  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;

  h2 {
    margin: 0;
    margin-bottom: 32px;
    text-align: start;
  }

  article {
    margin-bottom: 16px;

    display: flex;
    flex-direction: column;

    p {
      margin: 0;
      margin-bottom: 2px;
      text-align: left;
    }
    .info-box {
      margin-left: 8px;
      padding: 4px 36px;
      border: 1px solid #FFFFFF;
      border-radius: 8px;
    }
  }
}
</style>