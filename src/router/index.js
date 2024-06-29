import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import AdminView from '../views/AdminView.vue';
import AdminDashboard from '@/components/admin/Dashboard.vue';
import AdminCalendar from '@/components/admin/Calendar.vue';
import { refreshToken } from '@/services/user.service';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/admin',
    component: AdminView,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'AdminDashboard',
        component: AdminDashboard
      },
      {
        path: 'calendar',
        name: 'AdminCalendar',
        component: AdminCalendar
      }
    ]
  },
  // Otras rutas aquí...
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

// Middleware de navegación
router.beforeEach(async (to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('access_token');
  
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next({ name: 'Login' });
    } else {
      try {
        await refreshToken();
        next();
      } catch (error) {
        console.error('Error al renovar el token:', error);
        next({ name: 'Login' });
      }
    }
  } else {
    next();
  }
});

export default router;
