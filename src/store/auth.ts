import { defineStore } from 'pinia'
import axios from 'axios'

const API_URL = 'http://localhost:8080'

interface User {
	id: string
	email: string
	name: string
}

interface AuthState {
	user: User | null
	token: string | null
	tokenExpiry: number | null
}

export const useAuthStore = defineStore('auth', {
	state: (): AuthState => {
		return {
			user: null,
			token: null,
			tokenExpiry: null
		}
	},
	
	getters: {
		isAuthenticated: (state) => {
			if (!state.token) return false
			
			if (state.tokenExpiry) {
				const now = Date.now() / 1000
				if (now > state.tokenExpiry) {
					return false
				}
			}
			
			return true
		}
	},
	
	actions: {
		initialize() {
			const token = localStorage.getItem('auth_token')
			const userJson = localStorage.getItem('auth_user')
			const expiry = localStorage.getItem('token_expiry')
			
			if (token && userJson) {
				try {
					this.token = token
					this.user = JSON.parse(userJson)
					this.tokenExpiry = expiry ? parseInt(expiry) : null
					
					if (this.tokenExpiry && (Date.now() / 1000) > this.tokenExpiry) {
						this.logout()
					}
				} catch (error) {
					this.logout()
				}
			}
		},
		
		// Parse the hash parameters after GitHub OAuth redirect
		parseAuthCallback(): boolean {
			if (window.location.hash) {
				const params = new URLSearchParams(window.location.hash.substring(1))
				const token = params.get('token')
				const expiry = params.get('expiry')
				const userId = params.get('userId')
				
				if (token && expiry) {
					this.token = token
					this.tokenExpiry = Math.floor(Date.now() / 1000) + parseInt(expiry)
					
					localStorage.setItem('auth_token', token)
					localStorage.setItem('token_expiry', this.tokenExpiry.toString())
					
					this.fetchUserDetails()
					
					// Clear the hash
					window.history.replaceState(
						null, 
						document.title, 
						window.location.pathname + window.location.search
					)
					
					return true
				}
			}
			return false
		},
		
		githubLogin() {
			window.location.href = `${API_URL}/auth/github`
		},
		
		async fetchUserDetails() {
			if (!this.token) return false
			
			try {
				const response = await axios.get(`${API_URL}/api/users/me`, {
					headers: { Authorization: `Bearer ${this.token}` }
				})
				
				const userData = response.data
				
				// Map backend user data to User interface
				const user: User = {
					id: userData.id.toString(),
					email: userData.email || '',
					name: userData.username
				}
				
				this.user = user
				localStorage.setItem('auth_user', JSON.stringify(user))
				
				return true
			} catch (error) {
				console.error('Failed to fetch user details:', error)
				// If unauthorized, log out
				if (axios.isAxiosError(error) && error.response?.status === 401) {
					this.logout()
				}
				return false
			}
		},
		
		logout() {
			this.user = null
			this.token = null
			this.tokenExpiry = null
			
			localStorage.removeItem('auth_token')
			localStorage.removeItem('auth_user')
			localStorage.removeItem('token_expiry')
		},
		
		getAuthHeader() {
			return this.token ? { Authorization: `Bearer ${this.token}` } : {}
		}
	}
})
