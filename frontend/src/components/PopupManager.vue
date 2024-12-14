<template>
  <section 
    class="popup" 
    v-for="popup in popups"
    :key="popup.id"
    :id="popup.type"
  >
    <b v-if="popup.heading">{{ popup.heading }}</b>
    <span>{{ popup.message }}</span>
  </section>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState('popup', ['popups'])
  }
};
</script>

<style scoped>
.popup {
  position: fixed;
  top: 20px;
  left: 20px;

  background-color: #1C1C1C;
  padding: 8px;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 8px 0px #FFFFFF;
  border-radius: 8px;
}
</style>