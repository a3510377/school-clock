import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
  Router,
  RouteRecordRaw,
} from 'vue-router';
import viewClock from '@/views/Clock/index.vue';

const routes: RouteRecordRaw[] = [
  { name: 'TAB', path: '/tabs/:id', component: viewClock },
  { name: 'Home', path: '/', component: viewClock },
];

const router: Router = createRouter({
  history:
    import.meta.env.MODE === 'production'
      ? createWebHashHistory(import.meta.env.BASE_URL)
      : createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
