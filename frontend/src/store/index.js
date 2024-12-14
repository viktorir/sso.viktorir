import { createStore } from 'vuex'

import signIn from '@/store/modules/signin'
import jwtTokens from '@/store/modules/jwtTokens'
import personal from '@/store/modules/personal'
import signUp from '@/store/modules/signUp'
import popup from '@/store/modules/popup'

export default createStore({
  modules: {
    signIn,
    jwtTokens,
    personal,
    signUp,
    popup
  }
})
