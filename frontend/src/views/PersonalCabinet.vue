<template>
    <LoaderSpinner v-if="isUserLoading" />
    <main v-if="error">{{ error }}</main>
    <n-layout v-if="user != {} && !isUserLoading" has-sider >
        <n-layout-sider 
            bordered 
            show-trigger
            collapse-mode="width"
            :collapsed="collapsed" 
            :collapsed-width="64"
            :width="240"
            :native-scrollbar="false"
            @collapse="collapsed = true"
            @expand="collapsed = false"
            style="height: 100%;"
            
        >
            <n-h2 v-if="!collapsed" style="margin-top: 1em; text-align: center;">SSO.viktorir</n-h2>
            <n-text v-if="!collapsed" style="display: block; text-align: center;">#{{ user.login }}</n-text>
            <n-menu
                :collapsed="collapsed"
                :collapsed-width="64"
                :collapsed-icon-size="22"
                :options="topMenuOptions"
                :value="selectedMenu"
            />

            <n-menu
                :collapsed="collapsed"
                :collapsed-width="64"
                :collapsed-icon-size="22"
                :options="bottomMenuOptions"
                style="margin: 2em 0;"
            />
        </n-layout-sider>
        <n-layout-content content-style="padding: 1em">
            <router-view />
        </n-layout-content>
    </n-layout>
</template>

<script>
import { h } from 'vue'
import { mapGetters } from 'vuex'
import { NLayout, NLayoutSider, NLayoutContent, NMenu, NIcon } from 'naive-ui'
import { PersonOutline, List, ShieldOutline, SettingsOutline, ExitOutline } from '@vicons/ionicons5';

import LoaderSpinner from '@/components/LoaderSpinner.vue';

export default {
    name: 'PersonalCabinet',
    components: {
        LoaderSpinner,
        NLayout, 
        NLayoutSider, 
        NLayoutContent,
        NMenu,
    },
    data() {
        return {
            collapsed: window.innerWidth <= 768,
            topMenuOptions: [
                {
                    label: this.$t('personalMenu.user'),
                    key: '/personal',
                    icon: () => h(NIcon, null, { default: () => h(PersonOutline) }),
                    onClick: () => this.$router.push('/personal') 
                },
                {
                    label: this.$t('personalMenu.services'),
                    key: '/personal/services',
                    icon: () => h(NIcon, null, { default: () => h(List) }),
                    onClick: () => this.$router.push('/personal/services') 
                },
                {
                    label: this.$t('personalMenu.security'),
                    key: '/personal/security',
                    icon: () => h(NIcon, null, { default: () => h(ShieldOutline) }),
                    onClick: () => this.$router.push('/personal/security')
                },
                {
                    label: this.$t('personalMenu.settings'),
                    key: '/personal/settings',
                    icon: () => h(NIcon, null, { default: () => h(SettingsOutline) }),
                    onClick: () => this.$router.push('/personal/settings')
                },
                
            ],
            bottomMenuOptions: [
                {
                    label: this.$t('personalMenu.signout'),
                    key: '/logout',
                    icon: () => h(NIcon, null, { default: () => h(ExitOutline) }),
                    onClick: () => this.signOut()
                }
            ]
        };
    },
    computed: {
        ...mapGetters('personal', ['user', 'isUserLoading', 'error']),
        selectedMenu() {
            return this.$route.path
        } 
    }, 
    methods: {
        async signOut() {
            await this.$store.dispatch('auth/signOut', null, { root: true });
            this.$router.push('/');
        }
    },
    async created() {
        await this.$store.dispatch('personal/fetchUser');
    },
}
</script>

<style scoped> 
.n-scrollbar-content {
    height: 100%;
    display: flex;
}
</style>
