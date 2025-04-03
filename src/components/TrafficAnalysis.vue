<template>
  <DashboardCard title="Traffic Analysis" button-text="View Details" @button-click="viewDetails">
    <div class="traffic-analysis">
      <div class="traffic-stats">
        <div class="stat-item">
          <div class="stat-label">Total Requests</div>
          <div class="stat-value">{{ totalRequests.toLocaleString() }}</div>
        </div>
        <div class="stat-item">
          <div class="stat-label">Legitimate</div>
          <div class="stat-value legitimate">{{ legitimatePercentage }}%</div>
        </div>
        <div class="stat-item">
          <div class="stat-label">Blocked</div>
          <div class="stat-value blocked">{{ blockedPercentage }}%</div>
        </div>
      </div>
      
      <div class="traffic-chart-container">
        <TrafficChart />
      </div>
    </div>
  </DashboardCard>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import DashboardCard from '@/components/DashboardCard.vue'
import TrafficChart from '@/components/TrafficChart.vue'
// import { useTrafficStore } from '@/store/traffic'

export default defineComponent({
  name: 'TrafficAnalysis',
  components: {
    DashboardCard,
    TrafficChart
  },
  setup() {
    // @TODO: remove mock when API is ready
    const legitimateRequests = ref(29700)
    const crawlerRequests = ref(5520)
    const ddosRequests = ref(1320)
    
    const totalRequests = computed(() => {
      return legitimateRequests.value + crawlerRequests.value + ddosRequests.value
    })
    
    const legitimatePercentage = computed(() => {
      return Math.round((legitimateRequests.value / totalRequests.value) * 100)
    })
    
    const blockedPercentage = computed(() => {
      return Math.round(((crawlerRequests.value + ddosRequests.value) / totalRequests.value) * 100)
    })
    
    const viewDetails = () => {
      console.log('View traffic analysis details clicked')
      // @TODO: this would navigate to a more detailed view in the future
    }
    
    return {
      totalRequests,
      legitimatePercentage,
      blockedPercentage,
      viewDetails
    }
  }
})
</script>

<style scoped>
.traffic-analysis {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.traffic-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.stat-item {
  text-align: center;
  padding: 0.75rem;
  background-color: #f8f9fa;
  border-radius: var(--border-radius);
}

.stat-label {
  font-size: 0.875rem;
  color: #6c757d;
  margin-bottom: 0.5rem;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--primary-color);
}

.stat-value.legitimate {
  color: var(--success-color);
}

.stat-value.blocked {
  color: var(--error-color);
}

.traffic-chart-container {
  flex: 1;
  min-height: 300px;
}
</style>
