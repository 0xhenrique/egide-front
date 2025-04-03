import { defineStore } from 'pinia'
import api from '@/services/api'

export interface ThreatType {
  type: string
  count: number
  color: string
}

interface ThreatState {
  threatTypes: ThreatType[]
  isLoading: boolean
  error: string | null
}

export const useThreatStore = defineStore('threat', {
  state: (): ThreatState => ({
    threatTypes: [],
    isLoading: false,
    error: null
  }),
  
  getters: {
    totalThreats: (state) => {
      return state.threatTypes.reduce((total, threat) => total + threat.count, 0)
    },
    
    mostCommonThreat: (state) => {
      if (state.threatTypes.length === 0) return null
      
      return state.threatTypes.reduce((prev, current) => {
        return (prev.count > current.count) ? prev : current
      })
    }
  },
  
  actions: {
    async fetchThreatTypes() {
      this.isLoading = true
      this.error = null
      
      try {
        // @TODO: in the future this would be an API call
        // const response = await api.get('/api/threats/types')
        // this.threatTypes = response.data
        
        // @TODO: for now just mock data
        await new Promise(resolve => setTimeout(resolve, 500)) // simulate delay
        
        this.threatTypes = [
          { type: 'DDoS Attacks', count: 427, color: 'rgba(229, 57, 53, 0.8)' },
          { type: 'Web Scrapers', count: 653, color: 'rgba(255, 152, 0, 0.8)' },
          { type: 'Brute Force', count: 283, color: 'rgba(156, 39, 176, 0.8)' },
          { type: 'SQL Injection', count: 175, color: 'rgba(33, 150, 243, 0.8)' },
          { type: 'XSS Attempts', count: 218, color: 'rgba(76, 175, 80, 0.8)' }
        ]
        
        return this.threatTypes
      } catch (error) {
        console.error('Error fetching threat types:', error)
        this.error = 'Failed to load threat data. Please try again.'
        throw error
      } finally {
        this.isLoading = false
      }
    }
  }
})
