import { createRouter, createWebHistory } from 'vue-router';
import { getCurrentUser } from 'vuefire';
import LoginView from '../views/LoginView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      meta: { requiresAuth: true },
      path: '/',
      name: 'books',
      component: () => import('../views/BooksView.vue'),
    },
    {
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      meta: { requiresAuth: true },
      path: '/authors',
      name: 'authors',
      component: () => import('../views/AuthorsView.vue'),
    },
  ],
});
router.beforeEach(async (to) => {
  // routes with `meta: { requiresAuth: true }` will check for the users
  if (to.meta.requiresAuth) {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return {
        path: '/login',
        query: {
          // we keep the current path in the query so we can redirect to it after login
          // with `router.push(route.query.redirectTo || '/')`
          redirectTo: to.fullPath,
        },
      };
    }
  }
});

export default router;
