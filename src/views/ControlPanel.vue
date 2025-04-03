<template>
  <div class="control-panel">
    <Navbar />
    
    <main class="control-panel-content">
      <div class="container">
        <div class="panel-header">
          <h2>Control Panel</h2>
          <p>Manage your Egide protection settings</p>
        </div>
        
        <div class="dashboard-grid">
          <div class="dashboard-row">
            <div class="dashboard-item small">
              <DashboardCard title="Recent Threats" button-text="View All Threats" @button-click="viewAllThreats">
                <div class="threat-list">
                  <div class="threat-item">
                    <div class="threat-icon bot"></div>
                    <div class="threat-details">
                      <div class="threat-type">AI Crawler</div>
                      <div class="threat-source">IP: 192.168.1.254</div>
                      <div class="threat-time">Today, 10:25 AM</div>
                    </div>
                    <div class="threat-status blocked">Blocked</div>
                  </div>

                  <div class="threat-item">
                    <div class="threat-icon ddos"></div>
                    <div class="threat-details">
                      <div class="threat-type">DDoS Attempt</div>
                      <div class="threat-source">Multiple IPs</div>
                      <div class="threat-time">Yesterday, 8:14 PM</div>
                    </div>
                    <div class="threat-status blocked">Blocked</div>
                  </div>
                </div>
              </DashboardCard>
            </div>
            
            <div class="dashboard-item large">
              <TrafficAnalysis />
            </div>
          </div>
          
          <div class="dashboard-row">
            <div class="dashboard-item large">
              <DashboardCard title="Protected Websites" button-text="Manage Websites" @button-click="manageWebsites">
                <ProtectedWebsites />
              </DashboardCard>
            </div>
            
            <div class="dashboard-item small">
              <ThreatDistribution />
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import Navbar from '@/components/Navbar.vue'
import DashboardCard from '@/components/DashboardCard.vue'
import ProtectedWebsites from '@/components/ProtectedWebsites.vue'
import TrafficAnalysis from '@/components/TrafficAnalysis.vue'
import ThreatDistribution from '@/components/ThreatDistribution.vue'

export default defineComponent({
  name: 'ControlPanel',
  components: {
    Navbar,
    DashboardCard,
    ProtectedWebsites,
    TrafficAnalysis,
	ThreatDistribution
  },
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()
    
    onMounted(() => {
      authStore.initialize()
      
      //if (!authStore.isAuthenticated) {
      //  router.push('/landing')
      //}
    })
    
    const manageWebsites = () => {
      console.log('Manage websites clicked')
    }
    
    const viewTrafficDetails = () => {
      console.log('View traffic details clicked')
    }
    
    const viewAllThreats = () => {
      console.log('View all threats clicked')
    }
    
    return {
      manageWebsites,
      viewTrafficDetails,
      viewAllThreats
    }
  }
})
</script>

<style>
.control-panel {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--color-background-primary);
}

.control-panel-content {
  padding: 2rem 0;
  flex: 1;
}

.panel-header {
  margin-bottom: 2rem;
}

.panel-header h2 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: var(--color-primary);
}

.panel-header p {
  font-size: 1.1rem;
  color: var(--color-text-secondary);
}

.dashboard-grid {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.dashboard-row {
  display: flex;
  gap: 1.5rem;
  width: 100%;
}

.dashboard-item {
  display: flex;
  height: fit-content;
}

.dashboard-item.small {
  width: 33.333%;
}

.dashboard-item.large {
  width: 66.666%;
}

/* Make inner dashboard cards take full height/width */
.dashboard-item > * {
  width: 100%;
}

.info-group {
  display: flex;
  margin-bottom: 1.5rem;
}

.info-item {
  flex: 1;
  text-align: center;
}

.info-label {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  margin-bottom: 0.5rem;
}

.info-item .info-value {
  font-size: 1.75rem;
  margin-bottom: 0;
}

.traffic-chart {
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-background-secondary);
  border-radius: var(--border-radius);
}

.chart-placeholder {
  color: var(--color-text-secondary);
  font-style: italic;
}

.threat-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.threat-item {
  display: flex;
  align-items: center;
  padding: 0.75rem;
  background-color: var(--color-background-secondary);
  border-radius: var(--border-radius);
}

.threat-icon {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin-right: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: var(--color-text-inverse);
}

.threat-icon.bot {
  background-color: var(--gruvbox-bright-orange);
}

.threat-icon.bot::after {
  content: 'AI';
}

.threat-icon.ddos {
  background-color: var(--gruvbox-bright-red);
}

.threat-icon.ddos::after {
  content: 'DDoS';
  font-size: 0.7rem;
}

.threat-details {
  flex: 1;
}

.threat-type {
  font-weight: var(--font-weight-medium);
  margin-bottom: 0.25rem;
}

.threat-source, .threat-time {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
}

.threat-status {
  font-size: 0.875rem;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
}

.threat-status.blocked {
  background-color: var(--color-error-bg);
  color: var(--color-error);
}

@media (max-width: 1024px) {
  .dashboard-row {
    flex-direction: column;
  }
  
  .dashboard-item.small,
  .dashboard-item.large {
    width: 100%;
  }
}
</style>
