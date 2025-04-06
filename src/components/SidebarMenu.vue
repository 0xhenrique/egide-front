<template>
  <div class="sidebar-menu">
    <div class="sidebar-header">
      <h1 class="sidebar-brand">Egide</h1>
    </div>

    <div class="sidebar-content">
      <div class="theme-controls">
        <ThemeSwitcher />
        <!-- <ThemeDebugger /> -->
      </div>
	  <hr>
      <div class="user-section" v-if="authStore.isAuthenticated">
        <div class="user-info">
          <span class="user-greeting">Welcome, {{ authStore.user?.name }}</span>
        </div>
        <button class="btn btn-secondary logout-btn" @click="logout">
          Logout
          <span class="logout-icon"></span>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAuthStore } from '@/store/auth'
import { useRouter } from 'vue-router'
import ThemeSwitcher from '@/components/ThemeSwitcher.vue'
// import ThemeDebugger from '@/components/ThemeDebugger.vue'

export default defineComponent({
  name: 'SidebarMenu',
  components: {
    ThemeSwitcher,
    // ThemeDebugger
  },
  setup() {
    const authStore = useAuthStore()
    const router = useRouter()
    
    const logout = () => {
      authStore.logout()
      router.push('/landing')
    }
    
    return {
      authStore,
      logout
    }
  }
})
</script>

<style scoped>
.sidebar-menu {
  background-color: var(--color-navbar-bg);
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-sm);
  width: 240px;
}

.sidebar-header {
  padding: 1rem;
  border-bottom: 1px solid var(--color-border-light);
}

.sidebar-brand {
  font-size: 1.5rem;
  margin: 0;
  color: var(--color-primary);
}

.sidebar-content {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.sidebar-footer {
  border-top: 1px solid var(--color-border-light);
  padding: 1rem;
}

.user-section {
  margin-bottom: 1.5rem;
}

.user-info {
  margin-bottom: 0.8rem;
}

.user-greeting {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  display: block;
  margin-bottom: 0.5rem;
}

.logout-btn {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
}

.logout-icon {
  display: inline-block;
  width: 16px;
  height: 16px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='%2383a598' d='M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}

.theme-controls {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
