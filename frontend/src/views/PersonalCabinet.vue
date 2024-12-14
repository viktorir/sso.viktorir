<template>
    <LoaderSpinner v-if="isLoading" />
    <main v-if="error">{{ error }}</main>
    <main v-if="user">
        <aside>
            <h1>sso.viktorir</h1>
            <p>{{ user.login }}</p>
            <nav id="top_menu">
                <router-link to="/personal">
                    <img src="@/assets/icons/user.svg" alt="User">
                    User
                    <img src="@/assets/icons/chevron-right.svg" alt="chevron right" class="chevron">
                </router-link>
                <router-link to="/personal/services">
                    <img src="@/assets/icons/browser.svg" alt="Services">
                    Services
                    <img src="@/assets/icons/chevron-left.svg" alt="chevron left" class="chevron">
                </router-link>
                <router-link to="/personal/security">
                    <img src="@/assets/icons/shield.svg" alt="Security">
                    Security
                    <img src="@/assets/icons/chevron-left.svg" alt="chevron left" class="chevron">
                </router-link>
                <router-link to="/personal/settings">
                    <img src="@/assets/icons/gear.svg" alt="Settings">
                    Settings
                    <img src="@/assets/icons/chevron-left.svg" alt="chevron left" class="chevron">
                </router-link>
            </nav>
            <nav id="bottom_menu">
                <!-- <router-link to="/admin">
                    Admin Panel
                </router-link> --> 
                <router-link to="/" @click.prevent="$store.dispatch('jwtTokens/clearTokens')">
                    <img src="@/assets/icons/arrow-right-from-bracket.svg" alt="Logout">
                    Logout
                </router-link>
            </nav>
        </aside>
        <router-view></router-view>
    </main>
</template>

<script>
import { mapGetters } from 'vuex'
import LoaderSpinner from '@/components/LoaderSpinner.vue';

export default {
    name: 'PersonalAccount',
    components: {
        LoaderSpinner
    },
    computed: {
        ...mapGetters('personal', ['user', 'isLoading', 'error'])
    }, 
    async created() {
        await this.$store.dispatch('personal/fetchUser');
    },
}
</script>

<style>
main {
    display: flex;
    height: 100vh;
}
aside {
    display: flex;
    flex-direction: column;
    width: 250px;
    padding: 8px 36px;
    border-right: 2px solid #E31C25;

    h1 {
        margin: 0;
        font-size: 48px;
    }

    p {
        margin: 0;
    }

    nav {
        margin: 16px 0;
    }

    #top_menu {
        flex: 1;
    }
}

nav {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;

    a {
        margin: 4px 0;
        color: #FFFFFF;
        text-decoration: none;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
            margin: 8px;
        }

        .chevron {
            margin-left: auto;
        }
    }

    a:hover {
        img {
            margin: 8px;
            margin-right: 16px;
        }

        .chevron {
            margin-left: auto;
            margin-right: 8px;
        }
    }
}
</style>