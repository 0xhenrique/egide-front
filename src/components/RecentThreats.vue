<template>
  <DashboardCard title="Recent Threats" button-text="View All Threats" @button-click="viewAllThreats">
    <!-- @TODO: Maybe using v-bind="$props" would be better if we wanted to forward all props -->

    <div class="threat-list">
      <div v-if="isLoading" class="loading-state">
        <div class="loading-spinner"></div>
        <p>Loading threats...</p>
      </div>
      
      <div v-else-if="error" class="error-state">
        <p>{{ error }}</p>
        <button class="btn btn-secondary" @click="fetchThreats">Retry</button>
      </div>
      
	  <!-- @TODO: Maybe I will need to refactor this in the future so it doesn't show false-positives -->
      <div v-else-if="threats.length === 0" class="empty-state">
        <div class="empty-icon"></div>
        <p>No threats detected recently.</p>
        <p class="empty-help">Your websites are well protected!</p>
      </div>
      
      <template v-else>
        <div 
          v-for="threat in threats" 
          :key="threat.id" 
          class="threat-item"
          @click="showThreatDetails(threat.id)"
        >
          <div :class="['threat-icon', getThreatIconClass(threat.type)]">
            <span class="threat-icon-symbol">{{ getThreatIconSymbol(threat.type) }}</span>
          </div>
          <div class="threat-details">
            <div class="threat-type">{{ threat.type }}</div>
            <div class="threat-source">{{ threat.source }}</div>
            <div class="threat-time">{{ formatTimestamp(threat.timestamp) }}</div>
            <div v-if="threat.website" class="threat-website">{{ threat.website }}</div>
          </div>
          <div :class="['threat-status', getStatusClass(threat.status)]">
            {{ threat.status }}
          </div>
        </div>
      </template>
    </div>
  </DashboardCard>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed } from 'vue'
import DashboardCard from '@/components/DashboardCard.vue'
import { useRecentThreatsStore } from '@/store/recentThreats'

export default defineComponent({
  name: 'RecentThreats',
  components: {
    DashboardCard
  },
  setup() {
    const threatStore = useRecentThreatsStore()
    
    const threats = computed(() => threatStore.recentThreats)
    const isLoading = computed(() => threatStore.isLoading)
    const error = computed(() => threatStore.error)
    
    const fetchThreats = async () => {
      try {
        await threatStore.fetchRecentThreats()
      } catch (error) {
        console.error('Failed to fetch threats:', error)
      }
    }
    
    const showThreatDetails = (threatId: string) => {
      console.log(`Show details for threat ${threatId}`)
      threatStore.getMoreDetails(threatId)
      // @TODO: this could later open a modal or navigate to a detailed view
    }
    
    const viewAllThreats = () => {
      console.log('View all threats clicked')
      // @TODO: this would navigate to a full threats page in the future
    }
    
    const getThreatIconClass = (type: string): string => {
      switch (type) {
        case 'AI Crawler':
          return 'bot'
        case 'DDoS Attempt':
          return 'ddos'
        case 'Brute Force':
          return 'brute'
        case 'SQL Injection':
          return 'sql'
        case 'XSS Attempt':
          return 'xss'
        default:
          return 'other'
      }
    }
    
    const getThreatIconSymbol = (type: string): string => {
      switch (type) {
        case 'AI Crawler':
          return 'AI'
        case 'DDoS Attempt':
          return 'DDoS'
        case 'Brute Force':
          return 'BF'
        case 'SQL Injection':
          return 'SQL'
        case 'XSS Attempt':
          return 'XSS'
        default:
          return '?'
      }
    }
    
    const getStatusClass = (status: string): string => {
      switch (status) {
        case 'Blocked':
          return 'blocked'
        case 'Detected':
          return 'detected'
        case 'Investigating':
          return 'investigating'
        default:
          return ''
      }
    }
    
    const formatTimestamp = (timestamp: string): string => {
      const date = new Date(timestamp)
      const now = new Date()
      const diffMs = now.getTime() - date.getTime()
      const diffSecs = Math.floor(diffMs / 1000)
      const diffMins = Math.floor(diffSecs / 60)
      const diffHours = Math.floor(diffMins / 60)
      const diffDays = Math.floor(diffHours / 24)
      
      if (diffSecs < 60) {
        return 'Just now'
      } else if (diffMins < 60) {
        return `${diffMins} ${diffMins === 1 ? 'minute' : 'minutes'} ago`
      } else if (diffHours < 24) {
        return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`
      } else if (diffDays === 1) {
        return 'Yesterday'
      } else if (diffDays < 7) {
        return `${diffDays} days ago`
      } else {
        // Format the date (e.g., "Apr 25, 2023")
        return date.toLocaleDateString(undefined, { 
          month: 'short', 
          day: 'numeric', 
          year: 'numeric' 
        })
      }
    }
    
    onMounted(fetchThreats)
    
    return {
      threats,
      isLoading,
      error,
      fetchThreats,
      viewAllThreats,
      showThreatDetails,
      getThreatIconClass,
      getThreatIconSymbol,
      getStatusClass,
      formatTimestamp
    }
  }
})
</script>

<style scoped>
.threat-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.threat-item {
  display: flex;
  align-items: center;
  padding: 0.75rem;
  background-color: var(--color-background-secondary);
  border-radius: var(--border-radius);
  transition: transform var(--transition-base), box-shadow var(--transition-base);
  cursor: pointer;
}

.threat-item:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.threat-icon {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin-right: 0.75rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: var(--font-weight-bold);
  color: var(--color-text-inverse);
  font-size: 0.75rem;
}

.threat-icon-symbol {
  line-height: 1;
}

.threat-icon.bot {
  background-color: var(--gruvbox-bright-orange);
}

.threat-icon.ddos {
  background-color: var(--gruvbox-bright-red);
  font-size: 0.65rem;
}

.threat-icon.brute {
  background-color: var(--gruvbox-bright-purple);
}

.threat-icon.sql {
  background-color: var(--gruvbox-bright-blue);
}

.threat-icon.xss {
  background-color: var(--gruvbox-bright-yellow);
  color: var(--gruvbox-dark0);
}

.threat-icon.other {
  background-color: var(--gruvbox-gray);
}

.threat-details {
  flex: 1;
  min-width: 0; /* text truncation */
}

.threat-type {
  font-weight: var(--font-weight-medium);
  margin-bottom: 0.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.threat-source,
.threat-time,
.threat-website {
  font-size: 0.75rem;
  color: var(--color-text-secondary);
  line-height: 1.4;
}

.threat-website {
  font-style: italic;
}

.threat-status {
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  white-space: nowrap;
  font-weight: var(--font-weight-medium);
}

.threat-status.blocked {
  background-color: var(--color-error-bg);
  color: var(--color-error);
}

.threat-status.detected {
  background-color: var(--color-warning-bg);
  color: var(--color-warning);
}

.threat-status.investigating {
  background-color: var(--color-info-bg);
  color: var(--color-info);
}

/* States */
.loading-state,
.error-state,
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  text-align: center;
  padding: 1rem;
}

.loading-state .loading-spinner {
  margin-bottom: 1rem;
}

.error-state p {
  margin-bottom: 1rem;
  color: var(--color-error);
}

.empty-state .empty-icon {
  width: 48px;
  height: 48px;
  margin-bottom: 1rem;
  opacity: 0.7;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='%23a89984' d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 16v-2h2v2h-2zm1-5c-.55 0-1-.45-1-1V8c0-.55.45-1 1-1s1 .45 1 1v4c0 .55-.45 1-1 1z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}

.empty-help {
  color: var(--color-text-tertiary);
  font-size: 0.875rem;
}
</style>
