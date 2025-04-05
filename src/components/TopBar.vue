<template>
  <nav class="topbar">
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
          <ThemeSwitcher class="theme-switcher-corner" />
        </div>

        <div class="navbar-auth">
          <template v-if="authStore.isAuthenticated">
            <span class="navbar-user">{{ authStore.user?.name }}</span>
            <button class="btn btn-secondary logout-btn" @click="logout">
              Logout
              <span class="logout-icon"></span>
            </button>
          </template>
          <template v-else>
            <button class="btn btn-secondary login-btn" @click="openLoginModal">Login</button>
            <button class="btn register-btn" @click="openRegisterModal">Register</button>
          </template>
        </div>
      </div>
    </div>
    
    <!-- Mobile overlay background -->
    <div v-if="isMenuOpen" class="mobile-menu-overlay" @click="isMenuOpen = false"></div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue'
// Had to add this guy here to make sure the theme is loaded
import ThemeSwitcher from '@/components/ThemeSwitcher.vue'
import { useAuthStore } from '@/store/auth'
import { useRouter, useRoute } from 'vue-router'

export default defineComponent({
  name: 'TopBar',
  emits: ['login', 'register'],
  components: {
	ThemeSwitcher
  },
  setup(props, { emit }) {
    const authStore = useAuthStore()
    const router = useRouter()
    const route = useRoute()
    
    const isMenuOpen = ref(false)
    
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
    
    // Listen for escape key to close mobile menu
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen.value) {
        isMenuOpen.value = false
      }
    }
    
    onMounted(() => {
      window.addEventListener('keydown', handleKeyDown)
    })
    
    onBeforeUnmount(() => {
      window.removeEventListener('keydown', handleKeyDown)
    })
    
    return {
      authStore,
      isMenuOpen,
      logout,
      openLoginModal,
      openRegisterModal,
      scrollToSection
    }
  }
})
</script>

<style scoped>
.theme-switcher-corner {
  display: none;
  position: fixed;
  bottom: 20px;
  left: 20px;
  z-index: 9998;
}

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

.navbar-brand h1 {
  font-size: 1.5rem;
  margin: 0;
  color: var(--color-primary);
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

.logout-btn {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
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

/* Mobile overlay */
.mobile-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 90;
}

/* Responsive styles */
@media (max-width: 768px) {
  .navbar-toggle {
    display: flex;
  }
  
  .navbar-menu {
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
  
  .navbar-menu.open {
    right: 0;
  }
  
  .navbar-links {
    flex-direction: column;
    width: 100%;
  }
  
  .navbar-auth {
    flex-direction: column;
    width: 100%;
  }
  
  .navbar-user {
    margin-bottom: 0.5rem;
  }
}
</style>
