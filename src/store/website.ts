import { defineStore } from 'pinia'
import api from '@/services/api'

interface Website {
  id: string
  domain: string
  isActive: boolean
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
      return state.websites.filter(website => website.isActive).length
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
    
    async addWebsite(domain: string) {
      this.isLoading = true
      this.error = null
      
      try {
        // This will be implemented when API is ready
        // const response = await api.post('/websites', { domain })
        // const newWebsite = response.data
        
        // Just a mock
        const newWebsite: Website = {
          id: Date.now().toString(),
          domain,
          isActive: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
        
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
    
    async toggleWebsiteStatus(id: string) {
      this.isLoading = true
      this.error = null
      
      try {
        const website = this.websites.find(w => w.id === id)
        if (!website) {
          throw new Error('Website not found')
        }
        
        // This will be implemented when API is ready
        // const response = await api.patch(`/websites/${id}`, { 
        //   isActive: !website.isActive 
        // })
        // const updatedWebsite = response.data
        
        // For now, just update the local state
        website.isActive = !website.isActive
        website.updatedAt = new Date().toISOString()
        
        return website
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
        // await api.delete(`/websites/${id}`)
        
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
    }
  }
})
