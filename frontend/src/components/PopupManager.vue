<template>
  <section class="popups-manager">
    <article 
      class="popup" 
      v-for="popup in popups"
      :key="popup.id"
      :id="popup.type"
    >
      <b class="heading" v-if="popup.heading">{{ popup.heading }}</b>
      <span>{{ popup.message }}</span>
    </article>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters('popup', ['popups'])
  }
};
</script>

<style scoped>
.popups-manager {
  position: fixed;
  bottom: 16px;
  right: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.popup {
  background-color: #1C1C1C;
  padding: 8px 16px;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 8px 0px #FFFFFF;
  border-radius: 8px;

  animation: slideIn 0.3s ease-in-out, slideOut 0.3s ease-in-out 4.8s;

  .heading {
    margin-bottom: 8px;
  }
}

#error {
  box-shadow: 0px 0px 8px 0px #E31C25;

  .heading {
    color: #E31C25
  }
}

#succes {
  box-shadow: 0px 0px 8px 0px #43A047;
}

#warning {
  box-shadow: 0px 0px 8px 0px #FFA000;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-36px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideOut {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(36px);
  }
}
</style>