import { defineStore } from 'pinia'
import api from '@/services/api'

export interface Threat {
  id: string
  type: 'AI Crawler' | 'DDoS Attempt' | 'Brute Force' | 'SQL Injection' | 'XSS Attempt' | 'Other'
  source: string
  timestamp: string
  status: 'Blocked' | 'Detected' | 'Investigating'
  details?: string
  website?: string
}

interface RecentThreatsState {
  threats: Threat[]
  isLoading: boolean
  error: string | null
}

export const useRecentThreatsStore = defineStore('recentThreats', {
  state: (): RecentThreatsState => ({
    threats: [],
    isLoading: false,
    error: null
  }),
  
  getters: {
    recentThreats: (state) => {
      // most recent first // limit to 5 most recent
      return [...state.threats].sort((a, b) => {
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      }).slice(0, 5)
    }
  },
  
  actions: {
    async fetchRecentThreats() {
      this.isLoading = true
      this.error = null
      
      try {
        // @TODO: replace with actual API call
        // const response = await api.get('/api/threats/recent')
        // this.threats = response.data
        
        // Mock data for now
        await new Promise(resolve => setTimeout(resolve, 500))
        
        this.threats = [
          {
            id: '1',
            type: 'AI Crawler',
            source: 'IP: 192.168.1.254',
            timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
            status: 'Blocked',
            website: 'example.com'
          },
          {
            id: '2',
            type: 'DDoS Attempt',
            source: 'Multiple IPs',
            timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
            status: 'Blocked',
            details: 'UDP flood attack',
            website: 'mystore.com'
          },
          {
            id: '3',
            type: 'Brute Force',
            source: 'IP: 203.0.113.42',
            timestamp: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
            status: 'Blocked',
            website: 'blog.example.org'
          },
          {
            id: '4',
            type: 'SQL Injection',
            source: 'IP: 198.51.100.73',
            timestamp: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
            status: 'Detected',
            website: 'example.com'
          },
          {
            id: '5',
            type: 'XSS Attempt',
            source: 'IP: 203.0.113.105',
            timestamp: new Date(Date.now() - 345600000).toISOString(), // 4 days ago
            status: 'Blocked',
            website: 'mystore.com'
          }
        ]
        
        return this.threats
      } catch (error) {
        console.error('Error fetching recent threats:', error)
        this.error = 'Failed to load recent threat data. Please try again.'
        throw error
      } finally {
        this.isLoading = false
      }
    },
    
    async getMoreDetails(threatId: string) {
      // This would fetch more details about a specific threat
      // For now, it's just a placeholder
      console.log(`Fetching more details for threat ${threatId}`)
      // @TODO: in the future, make an API call to get detailed info
      // const response = await api.get(`/api/threats/${threatId}`)
      // return response.data
    }
  }
})
