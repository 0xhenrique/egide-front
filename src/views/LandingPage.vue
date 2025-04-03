<template>
  <div class="landing-page">
    <header class="landing-header">
      <div class="container">
        <div class="landing-navbar">
          <div class="logo">
            <h1>Egide</h1>
          </div>
          <div class="auth-buttons">
            <button class="btn" @click="openLoginModal">Login</button>
            <button class="btn btn-secondary" @click="openRegisterModal">Register</button>
          </div>
        </div>
      </div>
    </header>
    
    <main class="landing-content">
      <div class="container">
        <section class="hero">
          <div class="hero-content">
            <h2>Protect Your Website From AI Crawlers and DDoS Attacks</h2>
            <p>Our advanced reverse-proxy solution protects your valuable content from mass scraping by AI crawlers, bots, and DDoS attacks - all without annoying CAPTCHAs.</p>
            <button class="btn hero-cta" @click="openRegisterModal">Get Started</button>
          </div>
          <div class="hero-image">
            <!-- Egide UI or security illustration -->
            <div class="placeholder-image">
              <div class="shield-icon"></div>
            </div>
          </div>
        </section>
        
        <section class="features">
          <h3>Advanced Protection Features</h3>
          <div class="feature-grid">
            <div class="feature-card">
              <h4>AI Crawler Detection</h4>
              <p>Intelligent detection of AI-powered crawlers and content scrapers.</p>
            </div>
            <div class="feature-card">
              <h4>DDoS Mitigation</h4>
              <p>Powerful protection against distributed denial of service attacks.</p>
            </div>
            <div class="feature-card">
              <h4>No CAPTCHAs</h4>
              <p>User-friendly protection that doesn't rely on frustrating CAPTCHA challenges.</p>
            </div>
            <div class="feature-card">
              <h4>Real-time Analytics</h4>
              <p>Detailed insights into traffic patterns and blocked threats.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
    
    <footer class="landing-footer">
      <div class="container">
        <p>&copy; 2025 Egide. All rights reserved.</p>
      </div>
    </footer>
    
    <AuthModal 
      v-if="showAuthModal" 
      :initial-mode="authMode" 
      @close="closeModal"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import AuthModal from '@/components/AuthModal.vue'

export default defineComponent({
  name: 'LandingPage',
  components: {
    AuthModal
  },
  setup() {
    const showAuthModal = ref(false)
    const authMode = ref('login')
    
    const router = useRouter()
    const authStore = useAuthStore()
    
    onMounted(() => {
      authStore.initialize()
      if (authStore.isAuthenticated) {
        router.push('/')
      }
    })
    
    const openLoginModal = () => {
      authMode.value = 'login'
      showAuthModal.value = true
    }
    
    const openRegisterModal = () => {
      authMode.value = 'register'
      showAuthModal.value = true
    }
    
    const closeModal = () => {
      showAuthModal.value = false
    }
    
    return {
      showAuthModal,
      authMode,
      openLoginModal,
      openRegisterModal,
      closeModal
    }
  }
})
</script>

<style>
.landing-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--color-background-primary);
}

.landing-header {
  background-color: var(--color-background-secondary);
  box-shadow: var(--shadow-sm);
  padding: 1rem 0;
}

.landing-navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo h1 {
  font-size: 1.5rem;
  margin: 0;
  color: var(--color-primary);
}

.auth-buttons {
  display: flex;
  gap: 1rem;
}

.landing-content {
  flex: 1;
  padding: 3rem 0;
}

.hero {
  display: flex;
  align-items: center;
  margin-bottom: 4rem;
}

.hero-content {
  flex: 1;
  padding-right: 2rem;
}

.hero-content h2 {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: var(--color-primary);
}

.hero-content p {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.hero-cta {
  padding: 0.75rem 1.5rem;
  font-size: 1.1rem;
}

.hero-image {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.placeholder-image {
  width: 300px;
  height: 300px;
  background-color: var(--color-background-secondary);
  border-radius: var(--border-radius);
  display: flex;
  justify-content: center;
  align-items: center;
}

.shield-icon {
  width: 150px;
  height: 180px;
  background-color: var(--color-primary);
  position: relative;
  border-top-left-radius: 75px;
  border-top-right-radius: 75px;
}

.shield-icon:before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120px;
  height: 150px;
  background-color: var(--color-background-primary);
  border-top-left-radius: 60px;
  border-top-right-radius: 60px;
}

.shield-icon:after {
  content: '';
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 60px;
  background-color: var(--color-primary);
  clip-path: polygon(0% 0%, 100% 0%, 75% 100%, 25% 100%);
}

.features {
  margin-top: 2rem;
  text-align: center;
}

.features h3 {
  font-size: 2rem;
  margin-bottom: 2rem;
  color: var(--color-primary);
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.feature-card {
  background-color: var(--color-card-background);
  padding: 2rem;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-sm);
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-card h4 {
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: var(--color-secondary);
}

.landing-footer {
  background-color: var(--color-background-secondary);
  padding: 1.5rem 0;
  margin-top: 3rem;
  text-align: center;
  border-top: 1px solid var(--color-border-light);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .hero {
    flex-direction: column;
  }

  .hero-content {
    padding-right: 0;
    margin-bottom: 2rem;
    text-align: center;
  }

  .hero-content h2 {
    font-size: 2rem;
  }

  .hero-content p {
    font-size: 1.1rem;
  }
}
</style>
