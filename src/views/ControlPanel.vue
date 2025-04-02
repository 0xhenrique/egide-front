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
          <div class="dashboard-card">
            <div class="card-header">
              <h3>Protection Status</h3>
            </div>
            <div class="card-body">
              <div class="status-indicator active">
                <span class="status-dot"></span>
                <span class="status-text">Active</span>
              </div>
              <p>Your websites are currently protected against AI crawlers and DDoS attacks.</p>
            </div>
            <div class="card-footer">
              <button class="btn btn-secondary">Configure</button>
            </div>
          </div>
          
          <div class="dashboard-card">
            <div class="card-header">
              <h3>Protected Websites</h3>
            </div>
            <div class="card-body">
              <div class="info-value">1</div>
              <p>website currently protected</p>
              <div class="website-list">
                <div class="website-item">
                  <span class="website-name">example.com</span>
                  <span class="website-status active">Active</span>
                </div>
              </div>
            </div>
            <div class="card-footer">
              <button class="btn btn-secondary">Manage Websites</button>
            </div>
          </div>
          
          <div class="dashboard-card">
            <div class="card-header">
              <h3>Traffic Overview</h3>
            </div>
            <div class="card-body">
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
            </div>
            <div class="card-footer">
              <button class="btn btn-secondary">View Details</button>
            </div>
          </div>
          
          <div class="dashboard-card">
            <div class="card-header">
              <h3>Recent Threats</h3>
            </div>
            <div class="card-body">
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
            </div>
            <div class="card-footer">
              <button class="btn btn-secondary">View All Threats</button>
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

export default defineComponent({
  name: 'ControlPanel',
  components: {
    Navbar
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
    
    return {}
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

.dashboard-card {
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.card-header {
  padding: 1.25rem;
  border-bottom: 1px solid #e9ecef;
  background-color: #f8f9fa;
}

.card-header h3 {
  margin: 0;
  font-size: 1.25rem;
  color: var(--primary-color);
}

.card-body {
  padding: 1.5rem;
  flex: 1;
}

.card-footer {
  padding: 1rem 1.25rem;
  border-top: 1px solid #e9ecef;
  background-color: #f8f9fa;
}

.status-indicator {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.status-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 0.5rem;
}

.status-indicator.active .status-dot {
  background-color: var(--success-color);
}

.status-text {
  font-weight: 500;
}

.status-indicator.active .status-text {
  color: var(--success-color);
}

.info-value {
  font-size: 2.5rem;
  font-weight: 600;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
}

.website-list {
  margin-top: 1.5rem;
}

.website-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid #e9ecef;
}

.website-item:last-child {
  border-bottom: none;
}

.website-name {
  font-weight: 500;
}

.website-status {
  font-size: 0.875rem;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
}

.website-status.active {
  background-color: rgba(67, 160, 71, 0.1);
  color: var(--success-color);
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
