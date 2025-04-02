<template>
  <div class="toast-container" v-if="visible">
    <div :class="['toast', `toast-${type}`]">
      <div class="toast-content">{{ message }}</div>
      <button class="toast-close" @click="close">&times;</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
  name: 'Toast',
  props: {
    message: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'error',
      validator: (value: string) => ['error', 'success', 'info'].includes(value)
    },
    duration: {
      type: Number,
      default: 3000
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close'],
  setup(props, { emit }) {
    const visible = ref(props.show)
    let timer: number | null = null
    
    const close = () => {
      visible.value = false
      emit('close')
    }
    
    const startTimer = () => {
      if (timer) {
        clearTimeout(timer)
      }
      
      timer = window.setTimeout(() => {
        close()
      }, props.duration)
    }
    
    watch(() => props.show, (newValue) => {
      visible.value = newValue
      if (newValue) {
        startTimer()
      }
    })
    
    watch(visible, (newValue) => {
      if (!newValue) {
        emit('close')
      }
    })
    
    if (props.show) {
      startTimer()
    }
    
    return {
      visible,
      close
    }
  }
})
</script>

<style>
.toast-container {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 9999;
}

.toast {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 250px;
  max-width: 400px;
  padding: 1rem;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  animation: toast-slide-in 0.3s ease;
}

.toast-error {
  background-color: #f8d7da;
  color: #721c24;
  border-left: 4px solid var(--error-color);
}

.toast-success {
  background-color: #d4edda;
  color: #155724;
  border-left: 4px solid var(--success-color);
}

.toast-info {
  background-color: #cce5ff;
  color: #004085;
  border-left: 4px solid #0d6efd;
}

.toast-content {
  flex: 1;
}

.toast-close {
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
  padding: 0 0.5rem;
  margin-left: 0.5rem;
  color: inherit;
  opacity: 0.7;
}

.toast-close:hover {
  opacity: 1;
}

@keyframes toast-slide-in {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>
