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
          <DashboardCard title="Protected Websites" button-text="Manage Websites" @button-click="manageWebsites">
            <ProtectedWebsites />
          </DashboardCard>
          
          <DashboardCard title="Traffic Overview" button-text="View Details" @button-click="viewTrafficDetails">
            <div class="info-group">
              <div class="info-item">
                <div class="info-label">Total Requests</div>
                <div class="info-value">8,429</div>
              </div>
              <div class="info-item">
                <div class="info-label">Blocked Requests</div>
                <div class="info-value">1,062</div>
              </div>
            </div>
            <div class="traffic-chart">
              <div class="chart-placeholder">Traffic chart will be displayed here</div>
            </div>
          </DashboardCard>
          
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

export default defineComponent({
  name: 'ControlPanel',
  components: {
    Navbar,
    DashboardCard,
    ProtectedWebsites
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
      // Will be implemented in the future
    }
    
    const viewTrafficDetails = () => {
      console.log('View traffic details clicked')
      // Will be implemented in the future
    }
    
    const viewAllThreats = () => {
      console.log('View all threats clicked')
      // Will be implemented in the future
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
  background-color: #f5f7fa;
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
  color: var(--primary-color);
}

.panel-header p {
  font-size: 1.1rem;
  color: #6c757d;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
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
  color: #6c757d;
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
  background-color: #f8f9fa;
  border-radius: var(--border-radius);
}

.chart-placeholder {
  color: #6c757d;
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
  background-color: #f8f9fa;
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
  color: white;
}

.threat-icon.bot {
  background-color: #ff9800;
}

.threat-icon.bot::after {
  content: 'AI';
}

.threat-icon.ddos {
  background-color: #f44336;
}

.threat-icon.ddos::after {
  content: 'DDoS';
  font-size: 0.7rem;
}

.threat-details {
  flex: 1;
}

.threat-type {
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.threat-source, .threat-time {
  font-size: 0.875rem;
  color: #6c757d;
}

.threat-status {
  font-size: 0.875rem;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
}

.threat-status.blocked {
  background-color: rgba(229, 57, 53, 0.1);
  color: #e53935;
}
</style>
