import { defineStore } from 'pinia'

interface User {
  id: string
  email: string
  name: string
}

interface AuthState {
  user: User | null
  token: string | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => {
    return {
      user: null,
      token: null
    }
  },
  getters: {
    isAuthenticated: (state) => !!state.token
  },
  actions: {
    initialize() {
      const token = localStorage.getItem('auth_token')
      const userJson = localStorage.getItem('auth_user')
      
      if (token && userJson) {
        try {
          this.token = token
          this.user = JSON.parse(userJson)
        } catch (error) {
          this.logout()
        }
      }
    },
    
    // @TODO: add github oauth
    async githubLogin(): Promise<boolean> {
      try {
        const user: User = {
          id: 'github_123456',
          email: 'github_user@example.com',
          name: 'GitHub User'
        }
        
        const token = 'github_token_' + Math.random().toString(36).substring(2)
        
        this.user = user
        this.token = token
        
        localStorage.setItem('auth_token', token)
        localStorage.setItem('auth_user', JSON.stringify(user))
        
        return true
      } catch (error) {
        console.error('GitHub login error:', error)
        return false
      }
    },
    
    // @TODO: real login
    async login(email: string, password: string): Promise<boolean> {
      if (email && password.length >= 6) {
        const user: User = {
          id: '1',
          email,
          name: email.split('@')[0]
        }
        
        const token = 'demo_token_' + Math.random().toString(36).substring(2)
        
        this.user = user
        this.token = token
        
        localStorage.setItem('auth_token', token)
        localStorage.setItem('auth_user', JSON.stringify(user))
        
        return true
      }
      
      return false
    },
    
    // @TODO: register
    async register(email: string, password: string, name: string): Promise<boolean> {
      if (email && password.length >= 6 && name) {
        const user: User = {
          id: '1',
          email,
          name
        }
        
        const token = 'demo_token_' + Math.random().toString(36).substring(2)
        
        this.user = user
        this.token = token
        
        localStorage.setItem('auth_token', token)
        localStorage.setItem('auth_user', JSON.stringify(user))
        
        return true
      }
      
      return false
    },
    
    logout() {
      this.user = null
      this.token = null
      
      localStorage.removeItem('auth_token')
      localStorage.removeItem('auth_user')
    }
  }
})
