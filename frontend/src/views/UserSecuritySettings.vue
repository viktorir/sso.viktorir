<template>
  <n-flex vertical>
    <n-h2 style="margin: 1em;">Security Settings</n-h2>
    <n-tag type="error" style="margin-left: 1em; width: min-content;">In Development! Coming Soon!!!</n-tag>

    <n-card title="Password Settings" style="margin-top: 1em;">
      <n-descriptions :column="1">
        <n-descriptions-item>
          <n-input v-model="currentPassword" placeholder="Current Password" type="password" disabled />
        </n-descriptions-item>
        <n-descriptions-item>
          <n-input v-model="newPassword" placeholder="New Password" type="password" disabled />
        </n-descriptions-item>
        <n-descriptions-item>
          <n-input v-model="confirmPassword" placeholder="Confirm Password" type="password" disabled />
        </n-descriptions-item>
        <n-descriptions-item>
          <n-button type="primary" size="small" disabled>
            Change Password
          </n-button>
        </n-descriptions-item>
      </n-descriptions>
    </n-card>

    <n-card title="Active Sessions" style="margin-top: 1em;">
      <n-descriptions :column="1">
        <n-descriptions-item>
          Device 1 - Location 1 - Last active 10 minutes ago
          <n-button size="small" type="error" disabled>
            Logout
          </n-button>
        </n-descriptions-item>
        <n-descriptions-item>
          Device 2 - Location 2 - Last active 2 hours ago
          <n-button size="small" type="error" disabled>
            Logout
          </n-button>
        </n-descriptions-item>
      </n-descriptions>
    </n-card>

    <n-card title="Contact Verification" style="margin-top: 1em;">
      <n-descriptions :column="1">
        <n-descriptions-item label="Phone Number">
          123-456-7890
          <n-tag type="error">Not Verified</n-tag>
          <n-button size="small" style="margin-left: 8px" disabled>
            Verify
          </n-button>
        </n-descriptions-item>
        <n-descriptions-item label="Email">
          user@example.com
          <n-tag type="error">Not Verified</n-tag>
          <n-button size="small" style="margin-left: 8px" disabled>
            Verify
          </n-button>
        </n-descriptions-item>
      </n-descriptions>
    </n-card>

    <n-card title="Two-Factor Authentication" style="margin-top: 1em;">
      <n-descriptions :column="1">
        <n-descriptions-item>
          <n-switch v-model:value="twoFactorEnabled" disabled />
          <span style="margin-left: 8px;">
            Two-Factor Authentication
          </span>
        </n-descriptions-item>
      </n-descriptions>
    </n-card>

  </n-flex>
</template>

<script>
import { NTag, NDescriptions, NDescriptionsItem, NCard, NSwitch, NFlex, NInput, NButton } from 'naive-ui'

export default {
  name: 'SecuritySettings',
  components: {
    NTag, NDescriptions, NDescriptionsItem, NCard, NSwitch, NFlex, NInput, NButton
  },
  data() {
    return {
      twoFactorEnabled: false,
      phoneVerified: true,  
      emailVerified: true,      
      passwordChangeEnabled: false,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    };
  },
};
</script>