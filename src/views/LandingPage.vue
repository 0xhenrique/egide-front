<template>
  <div class="landing-page">
    <Navbar />
    
    <main class="landing-content">
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="container">
          <div class="hero-grid">
            <div class="hero-content">
              <h1 class="hero-title">Protect Your Web Content Without Frustrating Your Users</h1>
              <p class="hero-subtitle">
                Egide shields your valuable content from AI scrapers and DDoS attacks while providing 
                a seamless experience for real users—no annoying CAPTCHAs needed.
              </p>
              <button class="btn btn-primary hero-cta" @click="openRegisterModal">
                Start Free Protection
              </button>
            </div>
            <div class="hero-image">
              <div class="placeholder-image">
                <div class="shield-icon"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="features-section">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">Intelligent Protection Without User Friction</h2>
          </div>
          
          <div class="features-grid">
            <div class="feature-card">
              <div class="feature-icon behavior-icon"></div>
              <h3 class="feature-title">Behavioral Analysis</h3>
              <p class="feature-description">
                Identifies bots by analyzing user behavior patterns without any visible verification steps.
              </p>
            </div>
            
            <div class="feature-card">
              <div class="feature-icon fingerprint-icon"></div>
              <h3 class="feature-title">Fingerprint Detection</h3>
              <p class="feature-description">
                Advanced browser and device fingerprinting to identify automated traffic without user interaction.
              </p>
            </div>
            
            <div class="feature-card">
              <div class="feature-icon ip-icon"></div>
              <h3 class="feature-title">IP Intelligence</h3>
              <p class="feature-description">
                Leverages IP reputation data and network behavior to identify suspicious traffic sources.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- How It Works Section -->
      <section class="how-it-works-section">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">How Egide Works</h2>
            <p class="section-subtitle">
              Simple integration with powerful protection in three easy steps
            </p>
          </div>
          
          <div class="steps-container">
            <div class="step-item">
              <div class="step-number">1</div>
              <div class="step-content">
                <h3 class="step-title">Easy Integration</h3>
                <p class="step-description">
                  Simple DNS configuration points your domain to our secure proxy. 
                  No code changes required.
                </p>
              </div>
            </div>
            
            <div class="step-connector"></div>
            
            <div class="step-item">
              <div class="step-number">2</div>
              <div class="step-content">
                <h3 class="step-title">Invisible Assessment</h3>
                <p class="step-description">
                  Our system analyzes traffic in real-time using multiple signals to 
                  identify automated requests.
                </p>
              </div>
            </div>
            
            <div class="step-connector"></div>
            
            <div class="step-item">
              <div class="step-number">3</div>
              <div class="step-content">
                <h3 class="step-title">Adaptive Protection</h3>
                <p class="step-description">
                  Machine learning continuously improves detection accuracy based on 
                  your specific traffic patterns.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- FAQ Section -->
      <section class="faq-section">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">Frequently Asked Questions</h2>
          </div>
          
          <div class="faq-grid">
            <div class="faq-item">
              <h3 class="faq-question">How does Egide work without CAPTCHAs?</h3>
              <p class="faq-answer">
                Egide uses a combination of behavioral analysis, device fingerprinting, and 
                IP intelligence to identify and block automated traffic without requiring 
                any user interaction. Unlike traditional CAPTCHA systems, our solution runs 
                completely in the background, creating a seamless experience for legitimate users.
              </p>
            </div>
            
            <div class="faq-item">
              <h3 class="faq-question">Will this slow down my website?</h3>
              <p class="faq-answer">
                Egide is designed to have minimal impact on page load times. Our globally 
                distributed infrastructure ensures that traffic routing adds less than 50ms 
                of latency in most regions. Many customers actually see improved performance 
                due to our built-in CDN capabilities and protection against resource-draining 
                bot traffic.
              </p>
            </div>
            
            <div class="faq-item">
              <h3 class="faq-question">How difficult is it to set up?</h3>
              <p class="faq-answer">
                Setup is incredibly simple and typically takes less than 10 minutes. Just 
                update your DNS settings to point to our secure proxy, and Egide begins 
                protecting your site immediately. Our step-by-step wizard guides you through 
                the entire process without requiring any technical expertise.
              </p>
            </div>
            
            <div class="faq-item">
              <h3 class="faq-question">Can I customize the protection rules?</h3>
              <p class="faq-answer">
                Absolutely. While Egide works excellently with its default settings, you 
                can customize protection levels for different sections of your site, create 
                allowlists for trusted sources, and define custom rules based on your 
                specific needs. Our advanced dashboard gives you complete control over your 
                protection strategy.
              </p>
            </div>
            
            <div class="faq-item">
              <h3 class="faq-question">How does Egide handle user privacy and data security?</h3>
              <p class="faq-answer">
                Egide is built with privacy at its core. We collect only the minimum data 
                necessary to distinguish between legitimate users and bots. All sensitive data 
                is anonymized, and we never sell or share your users' information with third 
                parties. Our infrastructure is SOC 2 compliant and we offer GDPR-friendly 
                configurations.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Final CTA Section -->
      <section class="cta-section">
        <div class="container">
          <div class="cta-container">
            <h2 class="cta-title">Ready to Protect Your Website Without Frustrating Your Users?</h2>
            <p class="cta-subtitle">
              Join thousands of websites already using Egide to block AI scrapers and DDoS attacks 
              while providing a seamless experience for real users.
            </p>
            <div class="cta-buttons">
              <button class="btn btn-primary cta-btn" @click="openRegisterModal">
                Start Free Protection
              </button>
              <button class="btn btn-secondary cta-btn" @click="openLoginModal">
                Schedule a Demo
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
    
    <footer class="landing-footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-logo">
            <h3>Egide</h3>
          </div>
          <!-- <div class="footer-links"> -->
          <!--   <a href="#" class="footer-link">Privacy Policy</a> -->
          <!--   <a href="#" class="footer-link">Terms of Service</a> -->
          <!--   <a href="#" class="footer-link">Contact Us</a> -->
          <!-- </div> -->
          <div class="footer-copyright">
            &copy; {{ new Date().getFullYear() }} Egide. All rights reserved.
          </div>
        </div>
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
import Navbar from '@/components/Navbar.vue'
import AuthModal from '@/components/AuthModal.vue'

export default defineComponent({
  name: 'LandingPage',
  components: {
    Navbar,
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

.landing-content {
  flex: 1;
}

/* Hero Section */
.hero-section {
  padding: 4rem 0;
  position: relative;
  overflow: hidden;
  background-color: var(--gruvbox-dark0-hard);
}

.hero-grid {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.hero-content {
  flex: 1;
}

.hero-title {
  font-size: 2.5rem;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  color: var(--color-primary);
}

.hero-subtitle {
  font-size: 1.25rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  color: var(--color-text-secondary);
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
  background-color: var(--gruvbox-dark1);
  border-radius: var(--border-radius);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
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
  background-color: var(--gruvbox-dark1);
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

/* Section common styling */
.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-title {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: var(--color-primary);
}

.section-subtitle {
  font-size: 1.1rem;
  color: var(--color-text-secondary);
  max-width: 700px;
  margin: 0 auto;
}

/* Features Section */
.features-section {
  padding: 4rem 0;
  background-color: var(--color-background-primary);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.feature-card {
  padding: 2rem;
  background-color: var(--color-background-secondary);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-sm);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-align: center;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-md);
}

.feature-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 1.5rem;
  background-color: var(--color-background-tertiary);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.behavior-icon::after {
  content: '👁️';
  font-size: 2rem;
}

.fingerprint-icon::after {
  content: '🔍';
  font-size: 2rem;
}

.ip-icon::after {
  content: '🌐';
  font-size: 2rem;
}

.feature-title {
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: var(--color-secondary);
}

.feature-description {
  color: var(--color-text-secondary);
  line-height: 1.6;
}

/* How It Works Section */
.how-it-works-section {
  padding: 4rem 0;
  background-color: var(--gruvbox-dark0-hard);
}

.steps-container {
  max-width: 800px;
  margin: 0 auto;
}

.step-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background-color: var(--color-background-secondary);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-sm);
}

.step-number {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--color-primary);
  color: var(--gruvbox-dark0);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.25rem;
  font-weight: var(--font-weight-bold);
  margin-right: 1.5rem;
  flex-shrink: 0;
}

.step-content {
  flex: 1;
}

.step-title {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: var(--color-secondary);
}

.step-description {
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.step-connector {
  width: 2px;
  height: 30px;
  background-color: var(--color-primary);
  margin: 0 auto;
  margin-bottom: 1rem;
}

/* FAQ Section */
.faq-section {
  padding: 4rem 0;
  background-color: var(--color-background-primary);
}

.faq-grid {
  max-width: 800px;
  margin: 0 auto;
  display: grid;
  gap: 2rem;
}

.faq-item {
  padding: 1.5rem;
  background-color: var(--color-background-secondary);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-sm);
}

.faq-question {
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: var(--color-secondary);
  position: relative;
  padding-left: 1.5rem;
}

.faq-question::before {
  content: '•';
  position: absolute;
  left: 0;
  color: var(--color-primary);
}

.faq-answer {
  color: var(--color-text-secondary);
  line-height: 1.6;
}

/* CTA Section */
.cta-section {
  padding: 4rem 0;
  background-color: var(--gruvbox-dark0-hard);
}

.cta-container {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  padding: 3rem;
  background-color: var(--color-background-secondary);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-md);
}

.cta-title {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: var(--color-primary);
}

.cta-subtitle {
  font-size: 1.1rem;
  color: var(--color-text-secondary);
  margin-bottom: 2rem;
  line-height: 1.6;
}

.cta-buttons {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
}

.cta-btn {
  padding: 0.75rem 1.5rem;
  font-size: 1.1rem;
}

/* Footer */
.landing-footer {
  padding: 2rem 0;
  background-color: var(--gruvbox-dark0-hard);
  border-top: 1px solid var(--color-border-light);
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.footer-logo h3 {
  font-size: 1.5rem;
  margin: 0;
  color: var(--color-primary);
}

.footer-links {
  display: flex;
  gap: 1.5rem;
}

.footer-link {
  color: var(--color-text-secondary);
  transition: color var(--transition-base);
}

.footer-link:hover {
  color: var(--color-primary);
  text-decoration: none;
}

.footer-copyright {
  color: var(--color-text-tertiary);
  font-size: 0.875rem;
}

/* Responsive Design */
@media (max-width: 992px) {
  .hero-grid {
    flex-direction: column;
    text-align: center;
  }
  
  .features-grid {
    grid-template-columns: repeat(1, 1fr);
  }
  
  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .footer-content {
    flex-direction: column;
    text-align: center;
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 576px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .section-title {
    font-size: 1.75rem;
  }
  
  .cta-title {
    font-size: 1.75rem;
  }
}

/* Button styles */
.btn-primary {
  background-color: var(--color-primary);
  color: var(--color-text-inverse);
  border: none;
}

.btn-primary:hover {
  background-color: var(--color-primary-hover);
}
</style>
