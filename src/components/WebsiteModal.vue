<template>
  <div class="modal-backdrop" @click.self="closeModal">
    <div class="modal">
      <div class="modal-header">
        <h2 class="modal-title">{{ isEdit ? 'Edit Website' : 'Add New Website' }}</h2>
        <button class="modal-close" @click="closeModal">&times;</button>
      </div>
      <div class="modal-body">
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="domain">Domain</label>
            <input 
              type="text" 
              id="domain" 
              class="form-control" 
              v-model="formData.domain" 
              placeholder="example.com"
              :disabled="isEdit"
              required
            />
            <small v-if="errors.domain" class="error-message">{{ errors.domain }}</small>
          </div>
          
          <div class="form-group">
            <label for="protection_mode">Protection Mode</label>
            <div class="select-with-tooltip">
              <select 
                id="protection_mode" 
                class="form-control" 
                v-model="formData.protection_mode" 
                required
              >
                <option value="simple">Simple Protection</option>
                <option value="hardened">Hardened Protection</option>
              </select>
              <div class="tooltip-trigger" @mouseenter="showTooltip = true" @mouseleave="showTooltip = false">
                <span>?</span>
                <div class="tooltip-content" v-if="showTooltip">
                  <strong>Simple Protection:</strong> Protects against AI crawlers only.<br>
                  <strong>Hardened Protection:</strong> Comprehensive protection against AI crawlers and other types of threats.
                </div>
              </div>
            </div>
            <small v-if="errors.protection_mode" class="error-message">{{ errors.protection_mode }}</small>
          </div>
          
          <div class="form-group">
            <div class="checkbox-control">
              <input 
                type="checkbox" 
                id="active" 
                v-model="formData.active"
              />
              <label for="active">Activate protection</label>
            </div>
          </div>

		  <div class="form-info dns-info" v-if="!isEdit">
			<div class="info-icon">ⓘ</div>
			<div class="info-content">
			  After adding your website, you'll need to configure your DNS settings to point to our protection service.
			</div>
		  </div>
          
          <div class="modal-actions">
            <button 
              type="submit" 
              class="btn" 
              :disabled="isSubmitting"
            >
              <span v-if="isSubmitting" class="loading-spinner small"></span>
              {{ isEdit ? 'Update Website' : 'Add Website' }}
            </button>

			<button 
			  v-if="isEdit" 
			  type="button" 
			  class="btn btn-secondary dns-setup-btn" 
			  @click="$emit('open-dns-wizard', formData.id)"
			  >
			  {{ formData.verified ? 'View DNS Setup' : 'Configure DNS' }}
			</button>
            
            <button 
              v-if="isEdit" 
              type="button" 
              class="btn btn-delete" 
              :disabled="true" 
              title="Delete functionality coming soon"
            >
              Delete Website
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed } from 'vue'
import { useWebsiteStore } from '@/store/website'
import { useToastStore } from '@/store/toast'

interface WebsiteFormData {
  id?: string
  domain: string
  protection_mode: 'simple' | 'hardened'
  active: boolean
  verified?: boolean
}

export default defineComponent({
  name: 'WebsiteModal',
  props: {
    website: {
      type: Object,
      default: null
    }
  },
  emits: ['close', 'open-dns-wizard'],
  setup(props, { emit }) {
    const websiteStore = useWebsiteStore()
    const toastStore = useToastStore()
    const isSubmitting = ref(false)
    const showTooltip = ref(false)
    
    const formData = reactive<WebsiteFormData>({
      domain: '',
      protection_mode: 'simple',
      active: true,
	  verified: false
    })
    
    const errors = reactive({
      domain: '',
      protection_mode: ''
    })
    
    const isEdit = computed(() => {
      return props.website !== null
    })
    
    // Initialize form data if editing
    if (props.website) {
      formData.id = props.website.id
      formData.domain = props.website.domain
      formData.protection_mode = props.website.protection_mode || 'simple'
      formData.active = props.website.active || props.website.isActive
      formData.verified = props.website.verified || false
    }
    
    const validateForm = () => {
      let isValid = true
      
      // Reset errors
      errors.domain = ''
      errors.protection_mode = ''
      
      // Validate domain
      if (!formData.domain) {
        errors.domain = 'Domain is required'
        isValid = false
      } else if (!/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/.test(formData.domain)) {
        errors.domain = 'Please enter a valid domain'
        isValid = false
      }
      
      // Validate protection mode
      if (!formData.protection_mode) {
        errors.protection_mode = 'Protection mode is required'
        isValid = false
      }
      
      return isValid
    }
    
    const handleSubmit = async () => {
      if (!validateForm()) return
      
      isSubmitting.value = true
      
      try {
        if (isEdit.value && formData.id) {
          await websiteStore.updateWebsite(
            formData.id, 
            formData.domain, 
            formData.protection_mode, 
            formData.active
          )
          toastStore.showSuccess('Website updated successfully')
		} else {
			// Add new website
			const result = await websiteStore.addWebsite(
				formData.domain, 
				formData.protection_mode, 
				formData.active
			)
			toastStore.showSuccess('Website added successfully')
			
			// After adding a website, show a notification about DNS setup
			toastStore.showInfo('Please set up your DNS to complete the protection setup.')
			
			// Close the add website modal but save the new website ID
			formData.id = result.id
			
			// Automatically open the DNS setup wizard for the new website
			emit('open-dns-wizard', result.id)
			closeModal()
		}
      } catch (error: any) {
        if (error.response?.status === 403 && error.response?.data?.message?.includes('quota')) {
          toastStore.showError('You have reached your website quota. Please upgrade your plan to add more websites.')
        } else {
          toastStore.showError(
            isEdit.value 
              ? 'Failed to update website. Please try again.' 
              : 'Failed to add website. Please try again.'
          )
        }
        console.error('Error submitting website form:', error)
      } finally {
        isSubmitting.value = false
      }
    }
    
    const closeModal = () => {
      emit('close')
    }
    
    return {
      formData,
      errors,
      isSubmitting,
      isEdit,
      showTooltip,
      handleSubmit,
      closeModal
    }
  }
})
</script>

<style scoped>
.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
}

.error-message {
  display: block;
  color: var(--color-error);
  margin-top: 0.25rem;
}

.select-with-tooltip {
  display: flex;
  align-items: center;
}

.select-with-tooltip select {
  flex: 1;
}

.tooltip-trigger {
  position: relative;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: var(--color-text-tertiary);
  color: var(--color-background-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 0.75rem;
  cursor: help;
  font-size: 0.75rem;
  font-weight: var(--font-weight-bold);
}

.tooltip-content {
  position: absolute;
  bottom: 100%;
  right: 0;
  width: 280px;
  padding: 0.75rem;
  background-color: var(--color-background-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-md);
  color: var(--color-text-primary);
  font-size: 0.875rem;
  z-index: 100;
  margin-bottom: 0.5rem;
  line-height: 1.5;
  font-weight: normal;
  text-align: left;
}

.tooltip-content::after {
  content: '';
  position: absolute;
  top: 100%;
  right: 5px;
  border-width: 5px;
  border-style: solid;
  border-color: var(--color-border) transparent transparent transparent;
}

.checkbox-control {
  display: flex;
  align-items: center;
}

.checkbox-control input {
  margin-right: 0.5rem;
}

.checkbox-control label {
  margin-bottom: 0;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
}

.btn-delete {
  background-color: var(--color-error-bg);
  color: var(--color-error);
  border: 1px solid var(--color-error);
}

.btn-delete:hover:not(:disabled) {
  background-color: var(--color-error);
  color: white;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.loading-spinner.small {
  width: 1rem;
  height: 1rem;
  border-width: 2px;
  margin-right: 0.5rem;
}

.dns-info {
  margin-top: 1.5rem;
  display: flex;
  align-items: flex-start;
  background-color: var(--color-info-bg);
  padding: 0.75rem;
  border-radius: var(--border-radius);
}

.info-icon {
  margin-right: 0.75rem;
  color: var(--color-info);
  font-size: 1.25rem;
}

.info-content {
  color: var(--color-info);
  font-size: 0.875rem;
  line-height: 1.4;
}

.dns-setup-btn {
  margin-right: 0.5rem;
}
</style>
