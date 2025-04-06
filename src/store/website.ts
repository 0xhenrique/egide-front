import { defineStore } from 'pinia'
import api from '@/services/api'

interface Website {
	id: string
	domain: string
	isActive: boolean
	active?: boolean
	protection_mode?: 'simple' | 'hardened'
	verified?: boolean
	createdAt: string
	updatedAt: string
}

interface WebsiteState {
	websites: Website[]
	isLoading: boolean
	error: string | null
}

export const useWebsiteStore = defineStore('website', {
	state: (): WebsiteState => ({
		websites: [],
		isLoading: false,
		error: null
	}),
	
	getters: {
		getWebsiteById: (state) => (id: string) => {
			return state.websites.find(website => website.id === id)
		},
		
		activeWebsitesCount: (state) => {
			return state.websites.filter(website => website.isActive || website.active).length
		},
		
		totalWebsitesCount: (state) => {
			return state.websites.length
		}
	},
	
	actions: {
		async fetchWebsites() {
			this.isLoading = true
			this.error = null
			
			try {
				const response = await api.get('/api/sites')
				this.websites = response.data
				return this.websites
			} catch (error) {
				this.error = 'Failed to load websites. Please try again.'
				throw error
			} finally {
				this.isLoading = false
			}
		},
		
		async addWebsite(
			domain: string, 
			protection_mode: 'simple' | 'hardened' = 'simple', 
			active: boolean = false
		) {
			this.isLoading = true
			this.error = null
			
			try {
				const response = await api.post('/api/sites', {
					domain,
					protection_mode,
					active
				})
				
				const newWebsite = response.data
				
				this.websites.push(newWebsite)
				return newWebsite
			} catch (error) {
				console.error('Error adding website:', error)
				this.error = 'Failed to add website. Please try again.'
				throw error
			} finally {
				this.isLoading = false
			}
		},
		
		async updateWebsite(
			id: string, 
			domain: string, 
			protection_mode: 'simple' | 'hardened' = 'simple', 
			active: boolean = false
		) {
			this.isLoading = true
			this.error = null
			
			try {
				const response = await api.put(`/api/sites/${id}`, {
					domain,
					protection_mode,
					active
				})
				
				const updatedWebsite = response.data
				
				// Update local state
				const index = this.websites.findIndex(w => w.id === id)
				if (index !== -1) {
					this.websites[index] = {
						...this.websites[index],
						domain,
						protection_mode,
						isActive: active,
						active,
						updatedAt: new Date().toISOString()
					}
				}
				
				return updatedWebsite
			} catch (error) {
				console.error('Error updating website:', error)
				this.error = 'Failed to update website. Please try again.'
				throw error
			} finally {
				this.isLoading = false
			}
		},
		
		async toggleWebsiteStatus(id: string) {
			this.isLoading = true
			this.error = null
			
			try {
				const website = this.websites.find(w => w.id === id)
				if (!website) {
					throw new Error('Website not found')
				}
				
				const isActive = website.isActive || website.active || false
				
				const response = await api.put(`/api/sites/${id}`, {
					active: !isActive
				})

				console.log(response)
				
				// Update local state
				const index = this.websites.findIndex(w => w.id === id)
				if (index !== -1) {
					this.websites[index] = {
						...this.websites[index],
						isActive: !isActive,
						active: !isActive,
						updatedAt: new Date().toISOString()
					}
				}
				
				return this.websites[index]
			} catch (error) {
				console.error('Error toggling website status:', error)
				this.error = 'Failed to update website status. Please try again.'
				throw error
			} finally {
				this.isLoading = false
			}
		},
		
		async deleteWebsite(id: string) {
			this.isLoading = true
			this.error = null
			
			try {
				// This will be implemented when API is ready
				// await api.delete(`/api/sites/${id}`)
				
				// For now, just remove from local state
				this.websites = this.websites.filter(website => website.id !== id)
				
				return true
			} catch (error) {
				console.error('Error deleting website:', error)
				this.error = 'Failed to delete website. Please try again.'
				throw error
			} finally {
				this.isLoading = false
			}
		},

		async checkDNSVerification(id: string) {
			this.isLoading = true
			this.error = null
			
			try {
				const response = await api.get(`/api/sites/${id}`)
				
				// Get the website from our local state
				const websiteIndex = this.websites.findIndex(website => website.id === id)
				if (websiteIndex === -1) {
					throw new Error('Website not found')
				}
				
				const verified = response.data.verified
				
				this.websites[websiteIndex] = {
					...this.websites[websiteIndex],
					verified,
					updatedAt: new Date().toISOString()
				}
				
				return { verified }
			} catch (error) {
				console.error('Error verifying DNS:', error)
				this.error = 'Failed to verify DNS settings. Please try again.'
				throw error
			} finally {
				this.isLoading = false
			}
		}
	}
})
