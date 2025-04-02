import { defineStore } from 'pinia'

interface ToastState {
  message: string
  type: 'error' | 'success' | 'info'
  visible: boolean
}

export const useToastStore = defineStore('toast', {
  state: (): ToastState => {
    return {
      message: '',
      type: 'info',
      visible: false
    }
  },
  actions: {
    showToast(message: string, type: 'error' | 'success' | 'info' = 'info') {
      this.message = message
      this.type = type
      this.visible = true
    },
    
    hideToast() {
      this.visible = false
    },
    
    showError(message: string) {
      this.showToast(message, 'error')
    },
    
    showSuccess(message: string) {
      this.showToast(message, 'success')
    },
    
    showInfo(message: string) {
      this.showToast(message, 'info')
    }
  }
})
