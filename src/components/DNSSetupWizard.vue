<template>
  <div class="modal-backdrop" @click.self="closeModal">
    <div class="modal wizard-modal">
      <div class="modal-header">
        <h2 class="modal-title">DNS Setup Wizard</h2>
        <button class="modal-close" @click="closeModal">&times;</button>
      </div>
      
      <div class="modal-body">
        <div v-if="isVerified" class="verification-success">
          <div class="success-icon">✓</div>
          <h3>DNS Verification Successful!</h3>
          <p>Your website is properly configured to use Egide protection.</p>
          <button class="btn" @click="closeModal">Close</button>
        </div>
        
        <div v-else>
          <div class="wizard-steps">
            <div class="steps-header">
              <div class="step-indicator" :class="{ 'active': currentStep === 1 }">1</div>
              <div class="step-connector"></div>
              <div class="step-indicator" :class="{ 'active': currentStep === 2 }">2</div>
              <div class="step-connector"></div>
              <div class="step-indicator" :class="{ 'active': currentStep === 3 }">3</div>
            </div>
            <div class="step-labels">
              <div class="step-label">Update DNS</div>
              <div class="step-label">Verify Changes</div>
              <div class="step-label">Complete</div>
            </div>
          </div>
          
          <!-- Step 1: DNS Update Instructions -->
          <div v-if="currentStep === 1" class="wizard-step">
            <h3>1. Update DNS Settings</h3>
            <p>To activate Egide protection for <strong>{{ website.domain }}</strong>, you need to update your DNS settings with your domain registrar or DNS provider.</p>
            
            <div class="dns-records">
              <h4>Add the following DNS records:</h4>
              
              <div class="record-table">
                <div class="record-table-header">
                  <div class="record-col">Record Type</div>
                  <div class="record-col">Name</div>
                  <div class="record-col">Value</div>
                  <div class="record-col">TTL</div>
                </div>
                
                <div class="record-row">
                  <div class="record-col">A</div>
                  <div class="record-col">@</div>
                  <div class="record-col">104.18.24.36</div>
                  <div class="record-col">3600</div>
                </div>
                
                <div class="record-row">
                  <div class="record-col">CNAME</div>
                  <div class="record-col">www</div>
                  <div class="record-col">{{ website.domain }}</div>
                  <div class="record-col">3600</div>
                </div>
                
                <div class="record-row">
                  <div class="record-col">TXT</div>
                  <div class="record-col">_egide-verify</div>
                  <div class="record-col">egide-verify={{ generateVerificationToken() }}</div>
                  <div class="record-col">3600</div>
                </div>
              </div>
              
              <div class="dns-propagation-notice">
                <div class="notice-icon">ⓘ</div>
                <div class="notice-content">
                  <strong>Note:</strong> DNS changes can take up to 48 hours to propagate worldwide, but typically complete within 15-30 minutes.
                </div>
              </div>
            </div>
            
            <div class="common-providers">
              <h4>Popular DNS Providers Instructions:</h4>
              <div class="provider-links">
                <button class="provider-link" @click="selectedProvider = 'cloudflare'" :class="{ 'active': selectedProvider === 'cloudflare' }">Cloudflare</button>
                <button class="provider-link" @click="selectedProvider = 'godaddy'" :class="{ 'active': selectedProvider === 'godaddy' }">GoDaddy</button>
                <button class="provider-link" @click="selectedProvider = 'namecheap'" :class="{ 'active': selectedProvider === 'namecheap' }">Namecheap</button>
                <button class="provider-link" @click="selectedProvider = 'route53'" :class="{ 'active': selectedProvider === 'route53' }">AWS Route 53</button>
              </div>
              
              <div class="provider-instructions" v-if="selectedProvider">
                <template v-if="selectedProvider === 'cloudflare'">
                  <ol>
                    <li>Log in to your Cloudflare account</li>
                    <li>Select your domain</li>
                    <li>Go to the "DNS" tab</li>
                    <li>Click "Add record" and enter the details shown above</li>
                    <li>Make sure Cloudflare proxy is disabled (gray cloud) for these records</li>
                  </ol>
                </template>
                
                <template v-else-if="selectedProvider === 'godaddy'">
                  <ol>
                    <li>Log in to your GoDaddy account</li>
                    <li>Go to the Domain Manager</li>
                    <li>Find your domain and click "DNS"</li>
                    <li>Add each record with the values shown above</li>
                    <li>Save your changes</li>
                  </ol>
                </template>
                
                <template v-else-if="selectedProvider === 'namecheap'">
                  <ol>
                    <li>Log in to your Namecheap account</li>
                    <li>Go to "Domain List" and click "Manage" next to your domain</li>
                    <li>Go to the "Advanced DNS" tab</li>
                    <li>Add each record with the values shown above</li>
                    <li>Save your changes</li>
                  </ol>
                </template>
                
                <template v-else-if="selectedProvider === 'route53'">
                  <ol>
                    <li>Log in to your AWS Console</li>
                    <li>Navigate to Route 53 service</li>
                    <li>Select your hosted zone for the domain</li>
                    <li>Click "Create Record" and enter the details for each record shown above</li>
                    <li>Confirm the changes</li>
                  </ol>
                </template>
              </div>
            </div>
          </div>
          
          <!-- Step 2: Verification -->
          <div v-else-if="currentStep === 2" class="wizard-step">
            <h3>2. Verify DNS Changes</h3>
            <p>Once you've updated your DNS settings, we need to verify the changes. The verification process checks if your domain is correctly pointing to our protection service.</p>
            
            <div class="verification-status" :class="verificationStatusClass">
              <div class="status-icon">{{ verificationStatusIcon }}</div>
              <div class="status-message">{{ verificationStatusMessage }}</div>
            </div>
            
            <div class="verification-actions">
              <button 
                class="btn" 
                @click="checkVerification" 
                :disabled="isVerifying"
              >
                <span v-if="isVerifying" class="loading-spinner small"></span>
                {{ isVerifying ? 'Checking...' : 'Check DNS Verification' }}
              </button>
              
              <div v-if="verificationAttempted && !isVerified" class="verification-help">
                <p>Common issues that might prevent verification:</p>
                <ul>
                  <li>DNS changes haven't propagated yet (can take up to 48 hours)</li>
                  <li>Record values were entered incorrectly</li>
                  <li>Missing required DNS records</li>
                </ul>
                <p>Please check your DNS settings and try again in a few minutes.</p>
              </div>
            </div>
          </div>
          
          <!-- Step 3: Completion -->
          <div v-else class="wizard-step">
            <div class="completion-content">
              <div class="success-icon">✓</div>
              <h3>Setup Complete!</h3>
              <p>Congratulations! Your website <strong>{{ website.domain }}</strong> is now protected by Egide.</p>
              
              <div class="protection-details">
                <div class="protection-detail">
                  <div class="detail-label">Protection Mode:</div>
                  <div class="detail-value">{{ getProtectionModeLabel(website.protection_mode) }}</div>
                </div>
                <div class="protection-detail">
                  <div class="detail-label">Status:</div>
                  <div class="detail-value status-active">{{ website.active ? 'Active' : 'Inactive' }}</div>
                </div>
                <div class="protection-detail">
                  <div class="detail-label">DNS Verification:</div>
                  <div class="detail-value status-verified">Verified</div>
                </div>
              </div>
              
              <div class="next-steps">
                <h4>Next Steps:</h4>
                <ul>
                  <li>Monitor your website traffic in the dashboard</li>
                  <li>Adjust protection settings as needed</li>
                  <li>Add more websites to protect your entire online presence</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div class="wizard-navigation">
            <button 
              v-if="currentStep > 1" 
              class="btn btn-secondary" 
              @click="prevStep"
            >
              Back
            </button>
            
            <button 
              v-if="currentStep < 3" 
              class="btn" 
              @click="nextStep"
              :disabled="currentStep === 2 && !isVerified"
            >
              {{ currentStep === 2 ? 'Complete Setup' : 'Continue' }}
            </button>
            
            <button 
              v-if="currentStep === 3" 
              class="btn" 
              @click="closeModal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useWebsiteStore } from '@/store/website'
import { useToastStore } from '@/store/toast'

export default defineComponent({
  name: 'DNSSetupWizard',
  props: {
    website: {
      type: Object,
      required: true
    }
  },
  emits: ['close'],
  setup(props, { emit }) {
    const websiteStore = useWebsiteStore()
    const toastStore = useToastStore()
    const currentStep = ref(1)
    const isVerifying = ref(false)
    const verificationAttempted = ref(false)
    const isVerified = ref(props.website.verified || false)
    const selectedProvider = ref('')
    
    const verificationStatusClass = computed(() => {
      if (!verificationAttempted.value) return 'status-pending'
      return isVerified.value ? 'status-success' : 'status-error'
    })
    
    const verificationStatusIcon = computed(() => {
      if (!verificationAttempted.value) return '?'
      return isVerified.value ? '✓' : '✗'
    })
    
    const verificationStatusMessage = computed(() => {
      if (!verificationAttempted.value) {
        return 'DNS verification has not been checked yet'
      }
      return isVerified.value
        ? 'DNS verification successful! Your domain is properly configured.'
        : 'DNS verification failed. Please check your DNS settings and try again.'
    })
    
    const generateVerificationToken = () => {
      // @TODO: This would normally be provided by the backend but we'll mock it
      const domain = props.website.domain.replace(/\./g, '-')
      return `${domain}-${Math.random().toString(36).substring(2, 10)}`
    }
    
    const getProtectionModeLabel = (mode: string) => {
      return mode === 'hardened' ? 'Hardened Protection' : 'Simple Protection'
    }
    
    const nextStep = () => {
      if (currentStep.value < 3) {
        currentStep.value++
      }
    }
    
    const prevStep = () => {
      if (currentStep.value > 1) {
        currentStep.value--
      }
    }
    
    const checkVerification = async () => {
      isVerifying.value = true
      
      try {
        // @TODO: This would be an actual API call in production
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        // Simulate verification with the API
        const response = await websiteStore.checkDNSVerification(props.website.id)
        isVerified.value = response.verified
        
        verificationAttempted.value = true
        
        if (isVerified.value) {
          toastStore.showSuccess('DNS verification successful!')
        } else {
          toastStore.showError('DNS verification failed. Please check your settings.')
        }
      } catch (error) {
        console.error('Error verifying DNS:', error)
        toastStore.showError('Error checking DNS verification. Please try again.')
      } finally {
        isVerifying.value = false
      }
    }
    
    const closeModal = () => {
      emit('close')
    }
    
    return {
      currentStep,
      isVerifying,
      isVerified,
      verificationAttempted,
      selectedProvider,
      verificationStatusClass,
      verificationStatusIcon,
      verificationStatusMessage,
      nextStep,
      prevStep,
      checkVerification,
      closeModal,
      generateVerificationToken,
      getProtectionModeLabel
    }
  }
})
</script>

<style scoped>
.wizard-modal {
  max-width: 700px;
  width: 100%;
}

.wizard-steps {
  margin-bottom: 2rem;
}

.steps-header {
  display: flex;
  align-items: center;
  justify-content: center;
}

.step-indicator {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: var(--color-background-tertiary);
  color: var(--color-text-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: var(--font-weight-bold);
}

.step-indicator.active {
  background-color: var(--color-primary);
  color: var(--color-text-inverse);
}

.step-connector {
  height: 2px;
  flex: 1;
  background-color: var(--color-background-tertiary);
  margin: 0 10px;
}

.step-labels {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  padding: 0 16px;
}

.step-label {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  text-align: center;
  flex: 1;
}

.wizard-step {
  padding: 1rem 0;
}

.wizard-step h3 {
  margin-bottom: 1rem;
  color: var(--color-primary);
}

.wizard-navigation {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid var(--color-border-light);
}

.dns-records {
  margin-bottom: 1.5rem;
  background-color: var(--color-background-secondary);
  padding: 1rem;
  border-radius: var(--border-radius);
}

.record-table {
  margin: 1rem 0;
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  overflow: hidden;
}

.record-table-header {
  display: flex;
  background-color: var(--color-background-tertiary);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
}

.record-row {
  display: flex;
  border-top: 1px solid var(--color-border-light);
}

.record-col {
  padding: 0.75rem;
  flex: 1;
}

.dns-propagation-notice {
  display: flex;
  align-items: flex-start;
  background-color: var(--color-info-bg);
  color: var(--color-info);
  padding: 0.75rem;
  border-radius: var(--border-radius);
  margin-top: 1rem;
}

.notice-icon {
  margin-right: 0.75rem;
  font-size: 1.25rem;
}

.common-providers {
  margin-bottom: 1.5rem;
}

.provider-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 1rem 0;
}

.provider-link {
  padding: 0.5rem 1rem;
  background-color: var(--color-background-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all var(--transition-base);
}

.provider-link:hover {
  background-color: var(--color-background-tertiary);
}

.provider-link.active {
  background-color: var(--color-background-tertiary);
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.provider-instructions {
  background-color: var(--color-background-secondary);
  padding: 1rem;
  border-radius: var(--border-radius);
  margin-top: 0.5rem;
}

.provider-instructions ol {
  margin: 0;
  padding-left: 1.5rem;
}

.provider-instructions li {
  margin-bottom: 0.5rem;
}

.verification-status {
  display: flex;
  align-items: center;
  padding: 1rem;
  border-radius: var(--border-radius);
  margin: 1.5rem 0;
}

.verification-status.status-pending {
  background-color: var(--color-background-secondary);
  color: var(--color-text-secondary);
}

.verification-status.status-success {
  background-color: var(--color-success-bg);
  color: var(--color-success);
}

.verification-status.status-error {
  background-color: var(--color-error-bg);
  color: var(--color-error);
}

.status-icon {
  font-size: 1.5rem;
  font-weight: var(--font-weight-bold);
  margin-right: 1rem;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.status-pending .status-icon {
  background-color: var(--color-background-tertiary);
}

.status-success .status-icon {
  background-color: var(--color-success);
  color: white;
}

.status-error .status-icon {
  background-color: var(--color-error);
  color: white;
}

.verification-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1.5rem;
}

.verification-help {
  margin-top: 1.5rem;
  background-color: var(--color-background-secondary);
  padding: 1rem;
  border-radius: var(--border-radius);
  width: 100%;
}

.verification-help ul {
  padding-left: 1.5rem;
  margin: 0.5rem 0;
}

.verification-help li {
  margin-bottom: 0.5rem;
}

.verification-success,
.completion-content {
  text-align: center;
  padding: 2rem 0;
}

.success-icon {
  width: 64px;
  height: 64px;
  background-color: var(--color-success);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  margin: 0 auto 1.5rem;
}

.protection-details {
  background-color: var(--color-background-secondary);
  padding: 1rem;
  border-radius: var(--border-radius);
  margin: 1.5rem 0;
  text-align: left;
}

.protection-detail {
  display: flex;
  margin-bottom: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--color-border-light);
}

.protection-detail:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.detail-label {
  flex: 1;
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
}

.detail-value {
  flex: 2;
}

.status-active {
  color: var(--color-primary);
}

.status-verified {
  color: var(--color-success);
}

.next-steps {
  text-align: left;
  margin-top: 1.5rem;
}

.next-steps h4 {
  margin-bottom: 0.75rem;
}

.next-steps ul {
  padding-left: 1.5rem;
  margin: 0;
}

.next-steps li {
  margin-bottom: 0.5rem;
}

.loading-spinner.small {
  width: 1rem;
  height: 1rem;
  border-width: 2px;
  margin-right: 0.5rem;
}
</style>
