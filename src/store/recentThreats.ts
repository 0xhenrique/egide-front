import { defineStore } from 'pinia'
import api from '@/services/api'

// API response type - matches the actual API response format
interface ApiThreat {
  nature: number
  source: string[]
  time: string
  site: string
  status: number
}

// Transformed threat type for the UI
export interface Threat {
  id: string
  type: 'AI Crawler' | 'DDoS Attempt' | 'Brute Force' | 'SQL Injection' | 'XSS Attempt' | 'Other'
  source: string
  timestamp: string
  status: 'Blocked' | 'Detected' | 'Investigating'
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
      // Most recent first, limit to 5 most recent
      return [...state.threats].sort((a, b) => {
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      }).slice(0, 5)
    }
  },
  
  actions: {
    mapNatureToType(nature: number): Threat['type'] {
      switch (nature) {
        case 1: return 'AI Crawler'
        case 2: return 'DDoS Attempt'
        case 3: return 'Brute Force'
        case 4: return 'XSS Attempt'
        case 5: return 'SQL Injection'
        default: return 'Other'
      }
    },
    
    mapStatusToString(status: number): Threat['status'] {
      switch (status) {
        case 1: return 'Blocked'
        case 2: return 'Detected'
        case 3: return 'Investigating'
        default: return 'Detected'
      }
    },
    
    formatSource(sourceArray: string[] | undefined): string {
      if (!sourceArray || sourceArray.length === 0) {
        return 'Unknown IP'
      } else if (sourceArray.length === 1) {
        return `IP: ${sourceArray[0]}`
      } else {
        return 'Multiple IPs'
      }
    },
    
    transformApiResponse(data: ApiThreat[]): Threat[] {
      const threats: Threat[] = []
      
      if (!Array.isArray(data)) {
        console.error('API response is not an array:', data)
        return threats
      }
      
      data.forEach((threatData, index) => {
        try {
          if (threatData) {
            threats.push({
              id: String(index),
              type: this.mapNatureToType(threatData.nature),
              source: this.formatSource(threatData.source),
              timestamp: threatData.time || new Date().toISOString(),
              status: this.mapStatusToString(threatData.status),
              website: threatData.site || 'Unknown site'
            })
          }
        } catch (error) {
          console.error('Error processing threat data:', error, threatData)
        }
      })
      
      return threats
    },
    
    async fetchRecentThreats() {
      this.isLoading = true
      this.error = null
      
      try {
        const response = await api.get('/api/threats')

        this.threats = this.transformApiResponse(response.data)
        return this.threats
      } catch (error) {
        console.error('Error fetching recent threats:', error)
        this.error = 'Failed to load recent threat data. Please try again.'
        // Don't throw the error - this causes the component to crash
        return []
      } finally {
        this.isLoading = false
      }
    },
    
    async getMoreDetails(threatId: string) {
      // @TODO: in the future, make an API call to get detailed info
      // const response = await api.get(`/api/threats/${threatId}`)
      // return response.data
      console.log(`Fetching more details for threat ${threatId}`)
    }
  }
})
