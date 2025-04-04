import axios from 'axios'
import { useAuthStore } from '@/store/auth';

const API_URL = 'http://localhost:8080'

const api = axios.create({
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json'
	}
})

api.interceptors.request.use(
	config => {
		const authStore = useAuthStore()
		if (authStore.isAuthenticated) {
			config.headers = {
				...config.headers,
				...authStore.getAuthHeader()
			}
		}
		return config
	},
	error => {
		return Promise.reject(error)
	}
)

api.interceptors.response.use(
	response => response,
	error => {
		if (error.response && error.response.status === 401) {
			const authStore = useAuthStore()
			authStore.logout()
			window.location.href = '/login'
		}
		return Promise.reject(error)
	}
)

export default api
