<template>
    <section>
            <h2>Personal account</h2>
            <article>
                <div>
                    <p>{{ user.login }}<br>username</p>
                </div>
                <div>
                    <p>{{ user.last_name }}<br>last name</p>
                </div>
                <div>
                    <p>{{ user.first_name }}<br>first name</p>
                </div>
                <div>
                    <p>{{ user.father_name }}<br>father name</p>
                </div>
                <div>
                    <p>{{ user.phone_number }}<br>phone number</p>
                </div>
                <div>
                    <p>{{ user.email }}<br>email</p>
                </div>
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

<style lang="sass" scoped>

</style>