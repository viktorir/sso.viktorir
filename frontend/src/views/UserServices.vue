<template>
  <n-flex>
    <n-h2 style="margin: 1em;">{{ $t('services.heading') }}</n-h2>
    <n-card v-for="service in services" :key="service.id" bordered :title="service.name">
      <n-descriptions :columns="1">
        <n-descriptions-item v-if="service.description" :label="$t('services.description')">
          {{ service.description }}
        </n-descriptions-item>
        <n-descriptions-item :label="$t('services.domain')">
          <a :href="'https://' + service.domain" target="_blank" rel="" style="color: #5656FF;">{{ service.domain }}</a>
        </n-descriptions-item>
        <n-descriptions-item v-if="service.roles || service.roles.length != 0">
          <n-collapse>
            <n-collapse-item title="Roles">
              <n-tag v-for="role in service.roles" :key="role">{{ role }}</n-tag>
            </n-collapse-item>
          </n-collapse>
        </n-descriptions-item>
        <n-descriptions-item v-else>
          <n-tag type="error">No roles!</n-tag>
        </n-descriptions-item>
      </n-descriptions>
    </n-card>
  </n-flex>
</template>

<script>
import { NFlex, NCard, NTag, NDescriptions, NDescriptionsItem, NCollapse, NCollapseItem } from 'naive-ui'
import { mapGetters } from 'vuex'

export default {
  name: 'UserService',
  components: {
    NFlex,
    NTag,
    NDescriptions,
    NDescriptionsItem,
    NCollapse, 
    NCollapseItem,
    NCard
  },
  computed: {
    ...mapGetters('personal', ['services', 'isServicesLoading', 'error'])
  },
  async created() {
    await this.$store.dispatch('personal/fetchServices')
  },

}
</script>
