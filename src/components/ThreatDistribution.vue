<template>
  <DashboardCard title="Threat Distribution" button-text="View All Threats" @button-click="viewAllThreats">
    <div class="threat-distribution">
      <div v-if="isLoading" class="loading-state">
        <div class="loading-spinner"></div>
        <p>Loading threat data...</p>
      </div>
      
      <div v-else-if="error" class="error-state">
        <p>{{ error }}</p>
        <button class="btn btn-secondary" @click="retryLoading">Retry</button>
      </div>
      
      <template v-else>
        <div class="chart-container">
          <canvas ref="chartCanvas" width="200" height="200"></canvas>
        </div>
        <div class="threat-stats">
          <div v-for="(stat, index) in threatStats" :key="index" class="threat-stat-item">
            <div class="threat-dot" :style="{ backgroundColor: stat.color }"></div>
            <div class="threat-type">{{ stat.type }}</div>
            <div class="threat-count">{{ stat.count }}</div>
          </div>
        </div>
      </template>
    </div>
  </DashboardCard>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue';
import Chart from 'chart.js/auto';
import DashboardCard from '@/components/DashboardCard.vue';
import { useThreatStore, ThreatType } from '@/store/threat';

export default defineComponent({
  name: 'ThreatDistribution',
  components: {
    DashboardCard
  },
  setup() {
    const chartCanvas = ref<HTMLCanvasElement | null>(null);
    const chart = ref<Chart | null>(null);
    const threatStore = useThreatStore();
    
    const threatStats = computed(() => threatStore.threatTypes);
    
    const createChart = () => {
      const canvas = chartCanvas.value;
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      if (threatStats.value.length === 0) return;
      
      const labels = threatStats.value.map(item => item.type);
      const data = threatStats.value.map(item => item.count);
      const colors = threatStats.value.map(item => item.color);
      
      if (chart.value) {
        chart.value.destroy();
      }
      
      chart.value = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels,
          datasets: [
            {
              data,
              backgroundColor: colors,
              borderColor: 'rgba(40, 40, 40, 0.5)',
              borderWidth: 1,
              hoverOffset: 5
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '65%',
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  const label = context.label || '';
                  const value = context.raw as number;
                  const total = context.dataset.data.reduce((acc: number, curr: number) => acc + curr, 0) as number;
                  const percentage = Math.round((value / total) * 100);
                  return `${label}: ${value} (${percentage}%)`;
                }
              }
            }
          }
        }
      });
    };
    
    const viewAllThreats = () => {
      console.log('View all threats clicked');
      // @TODO: This would navigate to a detailed threats page in the future
    };
    
    const retryLoading = async () => {
      try {
        await threatStore.fetchThreatTypes();
        if (threatStore.threatTypes.length > 0) {
          setTimeout(createChart, 100);
        }
      } catch (error) {
        console.error('Failed to load threat data on retry:', error);
      }
    };
    
    onMounted(async () => {
      try {
        await threatStore.fetchThreatTypes();
        // @TODO: this is a hack to give the DOM time to render before creating chart
        setTimeout(createChart, 100);
      } catch (error) {
        console.error('Failed to load threat data:', error);
      }
    });
    
    return {
      chartCanvas,
      threatStats,
      viewAllThreats,
      retryLoading,
      isLoading: computed(() => threatStore.isLoading),
      error: computed(() => threatStore.error)
    };
  }
});
</script>

<style scoped>
.threat-distribution {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.chart-container {
  position: relative;
  height: 200px;
  margin-bottom: 1rem;
}

.threat-stats {
  margin-top: 1rem;
}

.threat-stat-item {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  padding: 0.25rem 0;
}

.threat-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 0.5rem;
}

.threat-type {
  flex: 1;
  font-size: 0.875rem;
}

.threat-count {
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
}

.loading-state,
.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  text-align: center;
  color: var(--color-text-secondary);
}

.loading-state .loading-spinner {
  margin-bottom: 1rem;
}

.error-state p {
  margin-bottom: 1rem;
  color: var(--color-error);
}
</style>
