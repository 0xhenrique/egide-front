<template>
  <div class="navbar-component" :class="{ 'sidebar-mode': isSidebarMode }">
    <!-- Sidebar Mode for ControlPanel -->
    <nav v-if="isSidebarMode" class="sidebar">
      <div class="sidebar-header">
        <h1 class="navbar-brand">Egide</h1>
      </div>

      <div class="sidebar-content">
        <!-- This section could include additional links later -->
      </div>

      <div class="sidebar-footer">
        <div class="user-section" v-if="authStore.isAuthenticated">
          <div class="user-info">
            <span class="user-greeting">Welcome, {{ authStore.user?.name }}</span>
          </div>
          <button class="btn btn-secondary logout-btn" @click="logout">
            <span class="logout-icon"></span>
            Logout
          </button>
        </div>

        <div class="theme-controls">
          <ThemeSwitcher />
          <!-- <ThemeDebugger /> -->
        </div>
      </div>
    </nav>

    <!-- Topbar Mode for LandingPage -->
    <nav v-else class="topbar">
      <div class="container">
        <div class="navbar-brand">
          <h1>Egide</h1>
        </div>

        <div class="navbar-toggle" @click="isMenuOpen = !isMenuOpen">
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div class="navbar-menu" :class="{ 'open': isMenuOpen }">
          <div class="navbar-links">
            <a href="#features" class="navbar-link" @click="scrollToSection('features')">Features</a>
            <a href="#how-it-works" class="navbar-link" @click="scrollToSection('how-it-works')">How It Works</a>
            <a href="#faq" class="navbar-link" @click="scrollToSection('faq')">FAQ</a>
            <a href="#cta" class="navbar-link" @click="scrollToSection('cta')">Get Started</a>
          </div>

          <div class="navbar-auth">
            <template v-if="authStore.isAuthenticated">
              <span class="navbar-user">{{ authStore.user?.name }}</span>
              <button class="btn btn-secondary logout-btn" @click="logout">
                <span class="logout-icon"></span>
                Logout
              </button>
            </template>
            <template v-else>
              <button class="btn btn-secondary login-btn" @click="openLoginModal">Login</button>
              <button class="btn register-btn" @click="openRegisterModal">Register</button>
            </template>
          </div>
        </div>
      </div>
    </nav>

    <!-- Mobile overlay background -->
    <div v-if="!isSidebarMode && isMenuOpen" class="mobile-menu-overlay" @click="isMenuOpen = false"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useAuthStore } from '@/store/auth'
import { useRouter, useRoute } from 'vue-router'
import ThemeSwitcher from '@/components/ThemeSwitcher.vue'
// import ThemeDebugger from '@/components/ThemeDebugger.vue'

export default defineComponent({
  name: 'Navbar',
  components: {
    ThemeSwitcher
    // ThemeDebugger
  },
  props: {
    mode: {
      type: String,
      default: 'topbar', // 'topbar' or 'sidebar'
      validator: (value: string) => ['topbar', 'sidebar'].includes(value)
    }
  },
  emits: ['login', 'register'],
  setup(props, { emit }) {
    const authStore = useAuthStore()
    const router = useRouter()
    const route = useRoute()
    
    const isMenuOpen = ref(false)
    const isMobile = ref(window.innerWidth < 768)
    
    const isSidebarMode = computed(() => {
      return props.mode === 'sidebar' && !isMobile.value
    })
    
    const handleResize = () => {
      isMobile.value = window.innerWidth < 768
      if (isMobile.value) {
        isMenuOpen.value = false
      }
    }
    
    const logout = () => {
      authStore.logout()
      router.push('/landing')
    }
    
    const openLoginModal = () => {
      emit('login')
    }
    
    const openRegisterModal = () => {
      emit('register')
    }
    
    const scrollToSection = (sectionId: string) => {
      isMenuOpen.value = false
      
      // Check if we're on the landing page
      if (route.path !== '/landing') {
        router.push({ path: '/landing', hash: `#${sectionId}` })
        return
      }
      
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
    
    onMounted(() => {
      window.addEventListener('resize', handleResize)
      handleResize() // Initial check
    })
    
    onBeforeUnmount(() => {
      window.removeEventListener('resize', handleResize)
    })
    
    return {
      authStore,
      isMenuOpen,
      isMobile,
      isSidebarMode,
      logout,
      openLoginModal,
      openRegisterModal,
      scrollToSection
    }
  }
})
</script>

<style>
/* Common Navbar Styles */
.navbar-component {
  --sidebar-width: 240px;
  --transition-duration: 0.3s;
}

.navbar-brand h1 {
  font-size: 1.5rem;
  margin: 0;
  color: var(--color-primary);
}

/* Sidebar Mode Styles */
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: var(--sidebar-width);
  background-color: var(--color-navbar-bg);
  display: flex;
  flex-direction: column;
  z-index: 100;
  box-shadow: var(--shadow-md);
}

.sidebar-header {
  padding: 1rem;
  border-bottom: 1px solid var(--color-border-light);
}

.sidebar-content {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
}

.sidebar-footer {
  border-top: 1px solid var(--color-border-light);
  padding: 1rem;
}

.user-section {
  margin-bottom: 1rem;
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
  gap: var(--space-sm);
  width: 100%;
  justify-content: center;
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

/* Topbar Mode Styles */
.topbar {
  background-color: var(--color-navbar-bg);
  box-shadow: var(--shadow-sm);
  padding: var(--space-md) 0;
  position: relative;
  z-index: 100;
}

.topbar .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-toggle {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 24px;
  height: 18px;
  cursor: pointer;
}

.navbar-toggle span {
  height: 2px;
  width: 100%;
  background-color: var(--color-text-primary);
  transition: all 0.3s ease;
}

.navbar-menu {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.navbar-links {
  display: flex;
  gap: 1.5rem;
}

.navbar-link {
  color: var(--color-text-secondary);
  text-decoration: none;
  font-size: 1rem;
  transition: color var(--transition-base);
}

.navbar-link:hover {
  color: var(--color-primary);
  text-decoration: none;
}

.navbar-auth {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.navbar-user {
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
}

.login-btn, .register-btn {
  padding: 0.5rem 1rem;
}

/* Mobile Styles */
.mobile-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 90;
}

/* Styles for main content when sidebar is active */
.sidebar-mode ~ .control-panel-content {
  margin-left: var(--sidebar-width);
  transition: margin-left var(--transition-duration) ease;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  /* For mobile topbar */
  .navbar-toggle {
    display: flex;
  }
  
  .topbar .navbar-menu {
    position: fixed;
    top: 0;
    right: -280px;
    width: 280px;
    height: 100vh;
    background-color: var(--color-navbar-bg);
    flex-direction: column;
    justify-content: flex-start;
    padding: 2rem 1rem;
    transition: right 0.3s ease;
    z-index: 100;
    box-shadow: var(--shadow-lg);
    gap: 2rem;
  }
  
  .topbar .navbar-menu.open {
    right: 0;
  }
  
  .topbar .navbar-links {
    flex-direction: column;
    width: 100%;
  }
  
  .topbar .navbar-auth {
    flex-direction: column;
    width: 100%;
  }
  
  .topbar .navbar-user {
    margin-bottom: 0.5rem;
  }
  
  /* For mobile sidebar (converts to top) */
  .sidebar-mode .sidebar {
    width: 100%;
    height: auto;
    position: relative;
  }
  
  .sidebar-mode ~ .control-panel-content {
    margin-left: 0;
  }
  
  .sidebar-mode .sidebar-footer {
    padding: 0.75rem;
  }
  
  .sidebar-mode .sidebar-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .sidebar-mode .user-section {
    margin-bottom: 0;
  }
  
  .sidebar-mode .theme-controls {
    flex-direction: row;
  }
}
</style>
