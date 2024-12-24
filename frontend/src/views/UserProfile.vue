<template>
  <n-flex>
    <n-h2 style="margin: 1em;">{{ $t('profile.heading') }}</n-h2>
    <n-card title="Main">
      <n-descriptions :column="1">
        <n-descriptions-item :label="$t('profile.username')">
          {{ user.login }}
        </n-descriptions-item>
        <n-descriptions-item :label="$t('profile.lastName')">
          {{ user.last_name }}
          <n-tag v-if="!user.last_name" type="warning">No data!</n-tag>
        </n-descriptions-item>
        <n-descriptions-item :label="$t('profile.firstName')">
          {{ user.first_name }}
          <n-tag v-if="!user.first_name" type="warning">No data!</n-tag>
        </n-descriptions-item>
        <n-descriptions-item :label="$t('profile.fatherName')">
          {{ user.father_name }}
          <n-tag v-if="!user.father_name" type="warning">No data!</n-tag>
        </n-descriptions-item>
      </n-descriptions>
    </n-card>
    <n-card title="Contact">
      <n-descriptions :column="1">
        <n-descriptions-item :label="$t('profile.phoneNumber')">
          {{ user.phone_number }}
        </n-descriptions-item>
        <n-descriptions-item :label="$t('profile.email')">
          {{ user.email }}
          <n-tag v-if="!user.email" type="warning">No data!</n-tag>
        </n-descriptions-item>
      </n-descriptions>
    </n-card>
  </n-flex>
</template>

<script>
import { mapGetters } from 'vuex'
import { NCard, NDescriptions, NDescriptionsItem, NFlex, NTag } from 'naive-ui';

export default {
    name: 'UserProfile',
    components: {
      NCard,
      NTag,
      NDescriptions,
      NDescriptionsItem,
      NFlex
    },
    computed: {
      ...mapGetters('personal', ['user', 'isLoading', 'error'])
    }
}
</script>
