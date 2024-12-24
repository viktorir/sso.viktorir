import { createStore } from 'vuex'

import signIn from '@/store/modules/signin'
import auth from '@/store/modules/auth'
import personal from '@/store/modules/personal'
import signUp from '@/store/modules/signUp'
import settings from '@/store/modules/settings'

export default createStore({
  modules: {
    signIn,
    auth,
    personal,
    signUp,
    settings
  }
})
