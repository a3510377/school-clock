import {
  createRouter,
  createWebHistory,
  Router,
  RouteRecordRaw,
} from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    name: 'TAB',
    path: '/tabs/:id',
    component: () => import('@/views/Clock/index.vue'),
  },
  {
    name: 'Home',
    path: '/',
    component: () => import('@/views/Clock/index.vue'),
  },
];

const router: Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
