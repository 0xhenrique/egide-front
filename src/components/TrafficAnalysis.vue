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
      
      <!-- Coming Soon Overlay -->
      <div class="coming-soon-overlay">
        <div class="overlay-content">
          <div class="overlay-icon">🔄</div>
          <h3 class="overlay-title">Coming Soon</h3>
          <p class="overlay-message">Detailed traffic analytics will be available in the next release.</p>
        </div>
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
  position: relative;
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
  background-color: var(--color-background-secondary);
  border-radius: var(--border-radius);
}

.stat-label {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  margin-bottom: 0.5rem;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
}

.stat-value.legitimate {
  color: var(--color-success);
}

.stat-value.blocked {
  color: var(--color-error);
}

.traffic-chart-container {
  flex: 1;
  min-height: 300px;
}

/* Coming Soon Overlay Styles */
.coming-soon-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0); /* Semi-transparent dark background */
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  border-radius: var(--border-radius);
}

.overlay-content {
  text-align: center;
  padding: 2rem;
  max-width: 80%;
}

.overlay-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  opacity: 0.9;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.8);
}

.overlay-title {
  font-size: 1.5rem;
  color: var(--color-primary);
  /* text-shadow: 0 2px 4px rgba(0, 0, 0, 0.7); */
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.9);
}

.overlay-message {
  font-size: 1rem;
  color: var(--color-text-primary);
  line-height: 1.5;
  font-weight: bold;
  text-shadow: 5px 1px 5px rgba(0, 0, 0, 0.9);
}
</style>
