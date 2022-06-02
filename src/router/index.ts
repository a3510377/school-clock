import {
  createRouter,
  createWebHistory,
  Router,
  RouteRecordRaw,
} from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    name: 'Home',
    path: '/test',
    component: () => import('@/views/Main/index.vue'),
  },
  {
    name: 'a',
    path: '/',
    component: () => import('@/views/Clock/index.vue'),
  },
];

const router: Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
