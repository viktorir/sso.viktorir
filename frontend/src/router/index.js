import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import SigninView from '@/views/SigninView.vue'
import PersonalCabinet from '@/views/PersonalCabinet.vue'
import UserProfile from '@/views/UserProfile.vue'
import UserServices from '@/views/UserServices.vue'
import UserSecuritySettings from '@/views/UserSecuritySettings.vue'
import UserAccountSettings from '@/views/UserAccountSettings.vue'
import SignUp from '@/views/SignUp.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/signin',
    name: 'signin',
    component: SigninView
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUp
  },
  {
    path: '/personal',
    name: 'personal',
    component: PersonalCabinet,
    children: [
      {
        path: '',
        name: 'profile',
        component: UserProfile,
      },
      {
        path: 'services',
        name: 'services',
        component: UserServices,
      },
      {
        path: 'security',
        name: 'security',
        component: UserSecuritySettings,
      },
      {
        path: 'settings',
        name: 'settings',
        component: UserAccountSettings,
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const refreshToken = localStorage.getItem('refresh_token');

  if ((to.path === '/signin' || to.path === '/signup') && (refreshToken)) {
    next('/personal');
  } else {
    next();
  }
});

export default router
