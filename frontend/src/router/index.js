import { createRouter, createWebHistory } from 'vue-router'
import store from "@/store";

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/signin',
    name: 'signin',
    props: (route) => ({ redirect_url: route.query.redirect_url }),
    component: () => import('@/views/SignInView.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('@/views/SignUp.vue')
  },
  {
    path: '/personal',
    name: 'personal',
    component: () => import('@/views/PersonalCabinet.vue'),
    children: [
      {
        path: '',
        name: 'profile',
        component: () => import('@/views/UserProfile.vue'),
      },
      {
        path: 'services',
        name: 'services',
        component: () => import('@/views/UserServices.vue'),
      },
      {
        path: 'security',
        name: 'security',
        component: () => import('@/views/UserSecuritySettings.vue'),
      },
      {
        path: 'settings',
        name: 'settings',
        component: () => import('@/views/UserAccountSettings.vue'),
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if ((to.path === '/signin' || to.path === '/signup') && (store.getters['auth/isAuthorized'])) {
    next('/personal');
  }

  next();
});

export default router
