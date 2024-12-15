import { createStore } from 'vuex'

import signIn from '@/store/modules/signin'
import auth from '@/store/modules/auth'
import personal from '@/store/modules/personal'
import signUp from '@/store/modules/signUp'
import popup from '@/store/modules/popup'

export default createStore({
  modules: {
    signIn,
    auth,
    personal,
    signUp,
    popup
  }
})
