<template>
  <div class="kpi-dashboard">
    <div v-if="isLoading" class="kpi-loading-state">
      <div class="loading-spinner"></div>
      <p>Loading metrics...</p>
    </div>
    
    <template v-else>
      <KpiCard
        title="Total Requests"
        subtitle="Last 24 hours"
        :value="metrics.totalRequests.value"
        format="number"
        :change-value="metrics.totalRequests.change"
        :positive-is-good="true"
        icon="globe"
      />
      
      <KpiCard
        title="Blocked Threats"
        subtitle="Last 24 hours"
        :value="metrics.blockedThreats.value"
        format="number"
        :change-value="metrics.blockedThreats.change"
        :positive-is-good="false"
        icon="shield"
      />
      
      <KpiCard
        title="Response Time"
        subtitle="Average"
        :value="metrics.responseTime.value"
        format="text"
        :change-value="metrics.responseTime.change"
        :positive-is-good="false"
        icon="clock"
      />
      
      <KpiCard
        title="Uptime"
        subtitle="Last 30 days"
        :value="metrics.uptime.value"
        format="percent"
        :change-value="0"
        :show-change="false"
        icon="bolt"
        :subvalue="metrics.uptime.subvalue"
      />
    </template>
    
    <div v-if="error" class="kpi-error-state">
      <p>{{ error }}</p>
      <button class="btn btn-secondary" @click="refreshData">Retry</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue';
import KpiCard from './KpiCard.vue';
import { useKpiStore } from '@/store/kpi';

export default defineComponent({
  name: 'KpiDashboard',
  components: {
    KpiCard,
  },
  setup() {
    const kpiStore = useKpiStore();
    
    const metrics = computed(() => kpiStore.metrics);
    const isLoading = computed(() => kpiStore.isLoading);
    const error = computed(() => kpiStore.error);
    const lastUpdated = computed(() => kpiStore.formattedLastUpdated);
    
    const fetchData = async () => {
      try {
        await kpiStore.fetchKpiData();
      } catch (error) {
        console.error('Error loading KPI data:', error);
      }
    };
    
    const refreshData = async () => {
      try {
        await kpiStore.refreshKpiData();
      } catch (error) {
        console.error('Error refreshing KPI data:', error);
      }
    };

    onMounted(() => {
      fetchData();
    });

    return {
      metrics,
      isLoading,
      error,
      lastUpdated,
      refreshData
    };
  },
});
</script>

<style>
.kpi-dashboard {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
  position: relative;
}

.kpi-loading-state,
.kpi-error-state {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(40, 40, 40, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  border-radius: var(--border-radius);
  z-index: 10;
}

.kpi-loading-state .loading-spinner {
  width: 2rem;
  height: 2rem;
}

.kpi-error-state {
  text-align: center;
  padding: 1.5rem;
}

.kpi-error-state p {
  color: var(--color-error);
  margin-bottom: 1rem;
}

@media (max-width: 1200px) {
  .kpi-dashboard {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .kpi-dashboard {
    grid-template-columns: 1fr;
  }
}
</style>
