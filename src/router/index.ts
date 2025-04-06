import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/store/auth';
import LandingPage from '@/views/LandingPage.vue';
import ControlPanel from '@/views/ControlPanel.vue';
import GithubCallback from '@/views/GithubCallback.vue';

const routes: Array<any> = [
	{
		path: '/',
		name: 'ControlPanel',
		component: ControlPanel,
		meta: { requiresAuth: true }
	},
	{
		path: '/landing',
		name: 'LandingPage',
		component: LandingPage
	},
	{
		path: '/auth/callback',
		name: 'AuthCallback',
		component: GithubCallback
	}
]

const router = createRouter({
	history: createWebHistory(),
	routes
})

// @TODO: this needs to be worked

router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore()
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'LandingPage' })
  } else if (to.path === '/' && to.name === 'LandingPage' && authStore.isAuthenticated) {
    next({ name: 'ControlPanel' })
  } else {
    next()
  }
})
export default router
