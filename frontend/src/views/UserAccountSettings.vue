<template>
  <n-flex vertical>
    <n-h2 style="margin: 1em;">Account Settings</n-h2>
    <n-tag type="error" style="margin-left: 1em; width: min-content;">In Development! Coming Soon!!!</n-tag>

    <n-card title="Login Settings" style="margin-top: 1em;">
      <n-descriptions :column="1">
        <n-descriptions-item label="Login">
          user123
          <n-input v-model="newLogin" placeholder="Enter New Login" disabled />
        </n-descriptions-item>
        <n-descriptions-item>
          <n-button type="primary" size="small" disabled>
            Change Login
          </n-button>
        </n-descriptions-item>
      </n-descriptions>
    </n-card>

    <n-card title="Phone Number" style="margin-top: 1em;">
      <n-descriptions :column="1">
        <n-descriptions-item label="Phone Number">
          123-456-7890
          <n-input v-model="newPhoneNumber" placeholder="Enter New Phone Number" disabled />
        </n-descriptions-item>
        <n-descriptions-item>
          <n-button type="primary" size="small" disabled>
            Change Phone Number
          </n-button>
        </n-descriptions-item>
      </n-descriptions>
    </n-card>

    <n-card title="Full Name" style="margin-top: 1em;">
      <n-descriptions :column="1">
        <n-descriptions-item label="First Name">
          Viktor
          <n-input v-model="newFirstName" placeholder="Enter New First Name" disabled />
        </n-descriptions-item>
        <n-descriptions-item label="Last Name">
          Sverdyukov
          <n-input v-model="newLastName" placeholder="Enter New Last Name" disabled />
        </n-descriptions-item>
        <n-descriptions-item label="Father Name">
          Dmitrievich
          <n-input v-model="newFatherName" placeholder="Enter New Father Name" disabled />
        </n-descriptions-item>
      </n-descriptions>
    </n-card>

    <n-card title="Email" style="margin-top: 1em;">
      <n-descriptions :column="1">
        <n-descriptions-item label="Email">
          user@example.com
          <n-input v-model="newEmail" placeholder="Enter New Email" disabled />
        </n-descriptions-item>
        <n-descriptions-item>
          <n-button type="primary" size="small" disabled>
            Change Email
          </n-button>
        </n-descriptions-item>
      </n-descriptions>
    </n-card>

    <!-- Удаление аккаунта -->
    <n-card title="Delete Account" style="margin-top: 1em;">
      <n-descriptions :column="1">
        <n-descriptions-item>
          <n-button type="error" size="small" disabled>
            Delete Account
          </n-button>
        </n-descriptions-item>
      </n-descriptions>
    </n-card>
  </n-flex>
</template>

<script>
import { NTag, NDescriptions, NDescriptionsItem, NCard, NFlex, NInput, NButton } from 'naive-ui'

export default {
  name: 'AccountSettings',
  components: {
    NTag, NDescriptions, NDescriptionsItem, NCard, NFlex, NInput, NButton
  },
  data() {
    return {
      newLogin: '',
      newFirstName: '',
      newLastName: '',
      newFatherName: '',
      newPhoneNumber: '',
      newEmail: '',
    };
  },
};
</script>
