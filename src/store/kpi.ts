import { defineStore } from 'pinia'
import api from '@/services/api'

interface KpiMetric {
  value: number | string
  change?: number
  subvalue?: string
}

interface KpiData {
  totalRequests: KpiMetric
  blockedThreats: KpiMetric
  responseTime: KpiMetric
  uptime: KpiMetric
}

interface KpiState {
  metrics: KpiData
  isLoading: boolean
  error: string | null
  lastUpdated: string | null
}

export const useKpiStore = defineStore('kpi', {
  state: (): KpiState => ({
    metrics: {
      totalRequests: {
        value: 0,
        change: 0
      },
      blockedThreats: {
        value: 0,
        change: 0
      },
      responseTime: {
        value: '0ms',
        change: 0
      },
      uptime: {
        value: 0,
        subvalue: ''
      }
    },
    isLoading: false,
    error: null,
    lastUpdated: null
  }),

  getters: {
    formattedLastUpdated: (state) => {
      if (!state.lastUpdated) return 'Never'
      
      const date = new Date(state.lastUpdated)
      return date.toLocaleTimeString(undefined, {
        hour: '2-digit',
        minute: '2-digit'
      })
    }
  },

  actions: {
    async fetchKpiData() {
      this.isLoading = true
      this.error = null
      
      try {
        const response = await api.get('/api/metrics/kpi')
        const data = response.data
        
        this.metrics = data
        this.lastUpdated = new Date().toISOString()
        
        return this.metrics
      } catch (error) {
        console.error('Error fetching KPI data:', error)
        this.error = 'Failed to load KPI metrics. Please try again.'
        throw error
      } finally {
        this.isLoading = false
      }
    },
    
    // @TODO: This will be useful when the real API is available
    async refreshKpiData() {
      return this.fetchKpiData()
    }
  }
})
