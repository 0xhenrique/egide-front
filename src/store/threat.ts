import { defineStore } from 'pinia'
import api from '@/services/api'

interface ApiThreatDistribution {
	nature: number
	count: number
}

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
		mapNatureToType(nature: number): string {
			switch (nature) {
				case 1: return 'AI Crawler'
				case 2: return 'DDoS Attacks'
				case 3: return 'Brute Force'
				case 4: return 'XSS Attempts'
				case 5: return 'SQL Injection'
				default: return 'Other'
			}
		},
		
		
		// @TODO: think of a better way to handle colours since we have two themes (gruvbox and tokyo-night)
		mapNatureToColor(nature: number): string {
			switch (nature) {
				case 1: return 'rgba(255, 152, 0, 0.8)' // orange for AI Crawler
				case 2: return 'rgba(229, 57, 53, 0.8)'  // red for DDoS
				case 3: return 'rgba(156, 39, 176, 0.8)' // purple for Brute Force
				case 4: return 'rgba(76, 175, 80, 0.8)'  // green for XSS
				case 5: return 'rgba(33, 150, 243, 0.8)' // blue for SQL Injection
				default: return 'rgba(158, 158, 158, 0.8)' // gray for Other
			}
		},
		
		transformApiResponse(data: ApiThreatDistribution[]): ThreatType[] {
			if (!Array.isArray(data)) {
				console.error('API response is not an array:', data)
				return []
			}
			
			return data.map(item => ({
				type: this.mapNatureToType(item.nature),
				count: item.count,
				color: this.mapNatureToColor(item.nature)
			}))
		},
		
		async fetchThreatTypes() {
			this.isLoading = true
			this.error = null
			
			try {
				const response = await api.get('/api/threats/distribution')
				this.threatTypes = this.transformApiResponse(response.data)
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
