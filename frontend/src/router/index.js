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
    component: () => import('@/views/SigninView.vue')
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
    meta: { requiresAuth: true },
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
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const isAuthorized = store.getters['auth/isAuthorized']; 

  if (requiresAuth && !isAuthorized) {
    window.$notification.warning({
      title: 'Не авторизован!',
      content: 'После авторизации вы будете перенаправлены обратно на страницу.',
      duration: 3000 
    });
    return next('/signin');
  }

  if ((to.path === '/signin' || to.path === '/signup') && isAuthorized) {
    window.$notification.info({
      title: 'Авторизован!',
      content: 'Вы уже авторизованы и перенаправлены в личный кабинет.',
      duration: 3000 
    });
    return next('/personal');
  }

  return next();
});

export default router
