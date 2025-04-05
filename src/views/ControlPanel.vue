<template>
  <div class="control-panel">
    <!-- TopBar for mobile view -->
    <TopBar v-if="isMobile" />
    
    <div class="control-panel-layout">
      <!-- Sidebar Menu (hidden on mobile) -->
      <SidebarMenu v-if="!isMobile" class="control-panel-sidebar" />
      
      <!-- Main Content -->
      <main class="control-panel-content">
        <div class="container">
          <div class="panel-header">
            <h2>Control Panel</h2>
            <p>Manage your protection settings</p>
          </div>
          
          <KpiDashboard />
          
          <div class="dashboard-grid">
            <div class="dashboard-row">
              <div class="dashboard-item small">
                <RecentThreats />
              </div>
              
              <div class="dashboard-item large">
                <TrafficAnalysis />
              </div>
            </div>
            
            <div class="dashboard-row">
              <div class="dashboard-item large">
                <DashboardCard title="Protected Websites" button-text="Add Website" @button-click="manageWebsites">
                  <ProtectedWebsites ref="protectedWebsitesRef" />
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
    
    <!-- Global Toast for notifications -->
    <Toast
      v-if="toastStore.visible"
      :message="toastStore.message"
      :type="toastStore.type"
      :show="toastStore.visible"
      @close="toastStore.hideToast"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import { useToastStore } from '@/store/toast'
import TopBar from '@/components/TopBar.vue'
import SidebarMenu from '@/components/SidebarMenu.vue'
import DashboardCard from '@/components/DashboardCard.vue'
import ProtectedWebsites from '@/components/ProtectedWebsites.vue'
import TrafficAnalysis from '@/components/TrafficAnalysis.vue'
import ThreatDistribution from '@/components/ThreatDistribution.vue'
import RecentThreats from '@/components/RecentThreats.vue'
import Toast from '@/components/Toast.vue'
import KpiDashboard from '@/components/KpiDashboard.vue'

export default defineComponent({
  name: 'ControlPanel',
  components: {
    TopBar,
    SidebarMenu,
    DashboardCard,
    ProtectedWebsites,
    TrafficAnalysis,
    ThreatDistribution,
    RecentThreats,
    Toast,
    KpiDashboard
  },
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()
    const toastStore = useToastStore()
    const protectedWebsitesRef = ref<InstanceType<typeof ProtectedWebsites> | null>(null)
    const isMobile = ref(window.innerWidth < 768)
    
    const handleResize = () => {
      isMobile.value = window.innerWidth < 768
    }
    
    onMounted(() => {
      authStore.initialize()
      
      if (!authStore.isAuthenticated) {
        router.push('/landing')
      }
      
      window.addEventListener('resize', handleResize)
      handleResize() // Initial check
    })
    
    onBeforeUnmount(() => {
      window.removeEventListener('resize', handleResize)
    })
    
    const manageWebsites = () => {
      if (protectedWebsitesRef.value) {
        protectedWebsitesRef.value.addWebsite()
      }
    }
    
    return {
      toastStore,
      protectedWebsitesRef,
      manageWebsites,
      isMobile
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

.control-panel-layout {
  display: flex;
  flex: 1;
}

.control-panel-sidebar {
  flex-shrink: 0;
  border-right: 1px solid var(--color-border-light);
}

.control-panel-content {
  flex: 1;
  padding: 2rem 0;
  overflow-y: auto;
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

@media (max-width: 1024px) {
  .dashboard-row {
    flex-direction: column;
  }
  
  .dashboard-item.small,
  .dashboard-item.large {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .control-panel-layout {
    flex-direction: column;
  }
  
  .control-panel-content {
    padding-top: 1rem;
  }
}
</style>
