import { defineStore } from 'pinia'
//import api from '@/services/api'

interface TrafficData {
  date: string
  legitimate: number
  crawlers: number
  ddos: number
}

interface TrafficStats {
  totalRequests: number
  legitimateRequests: number
  crawlerRequests: number
  ddosRequests: number
}

interface TrafficState {
  dailyData: TrafficData[]
  weeklyData: TrafficData[]
  monthlyData: TrafficData[]
  stats: TrafficStats
  isLoading: boolean
  error: string | null
}

export const useTrafficStore = defineStore('traffic', {
  state: (): TrafficState => ({
    dailyData: [],
    weeklyData: [],
    monthlyData: [],
    stats: {
      totalRequests: 0,
      legitimateRequests: 0,
      crawlerRequests: 0,
      ddosRequests: 0
    },
    isLoading: false,
    error: null
  }),
  
  getters: {
    legitimatePercentage: (state) => {
      if (state.stats.totalRequests === 0) return 0
      return Math.round((state.stats.legitimateRequests / state.stats.totalRequests) * 100)
    },
    
    blockedPercentage: (state) => {
      if (state.stats.totalRequests === 0) return 0
      const blocked = state.stats.crawlerRequests + state.stats.ddosRequests
      return Math.round((blocked / state.stats.totalRequests) * 100)
    }
  },
  
  actions: {
    async fetchTrafficData(period: 'daily' | 'weekly' | 'monthly' = 'monthly') {
      this.isLoading = true
      this.error = null
      
      try {
        // In the future, this would be an actual API call
        // const response = await api.get(`/api/traffic/${period}`)
        // const data = response.data
        
        // For now, use mock data
        await new Promise(resolve => setTimeout(resolve, 500)) // simulate delay
        
        // This would be populated with data from the API
        switch (period) {
          case 'daily':
            this.dailyData = this.generateMockDailyData()
            break
          case 'weekly':
            this.weeklyData = this.generateMockWeeklyData()
            break
          case 'monthly':
          default:
            this.monthlyData = this.generateMockMonthlyData()
            break
        }
        
        this.calculateStats()
        
        return period === 'daily' ? this.dailyData : 
               period === 'weekly' ? this.weeklyData : 
               this.monthlyData
      } catch (error) {
        console.error(`Error fetching ${period} traffic data:`, error)
        this.error = `Failed to load traffic data. Please try again.`
        throw error
      } finally {
        this.isLoading = false
      }
    },
    
    calculateStats() {
      // Calculate overall stats from monthly data
      const data = this.monthlyData
      
      let legitimateRequests = 0
      let crawlerRequests = 0
      let ddosRequests = 0
      
      data.forEach(item => {
        legitimateRequests += item.legitimate
        crawlerRequests += item.crawlers
        ddosRequests += item.ddos
      })
      
      this.stats = {
        legitimateRequests,
        crawlerRequests,
        ddosRequests,
        totalRequests: legitimateRequests + crawlerRequests + ddosRequests
      }
    },
    
    // Mock data generation methods
    generateMockMonthlyData(): TrafficData[] {
      return [
        { date: 'Jan', legitimate: 4200, crawlers: 850, ddos: 120 },
        { date: 'Feb', legitimate: 3800, crawlers: 920, ddos: 150 },
        { date: 'Mar', legitimate: 4500, crawlers: 780, ddos: 200 },
        { date: 'Apr', legitimate: 5200, crawlers: 850, ddos: 180 },
        { date: 'May', legitimate: 5800, crawlers: 1020, ddos: 250 },
        { date: 'Jun', legitimate: 6200, crawlers: 1100, ddos: 320 }
      ]
    },
    
    generateMockWeeklyData(): TrafficData[] {
      return [
        { date: 'Week 1', legitimate: 1200, crawlers: 240, ddos: 80 },
        { date: 'Week 2', legitimate: 1350, crawlers: 280, ddos: 65 },
        { date: 'Week 3', legitimate: 1500, crawlers: 320, ddos: 95 },
        { date: 'Week 4', legitimate: 1400, crawlers: 290, ddos: 75 }
      ]
    },
    
    generateMockDailyData(): TrafficData[] {
      return [
        { date: 'Mon', legitimate: 320, crawlers: 65, ddos: 15 },
        { date: 'Tue', legitimate: 340, crawlers: 72, ddos: 18 },
        { date: 'Wed', legitimate: 380, crawlers: 85, ddos: 22 },
        { date: 'Thu', legitimate: 420, crawlers: 95, ddos: 25 },
        { date: 'Fri', legitimate: 450, crawlers: 105, ddos: 30 },
        { date: 'Sat', legitimate: 280, crawlers: 60, ddos: 12 },
        { date: 'Sun', legitimate: 250, crawlers: 50, ddos: 10 }
      ]
    }
  }
})
