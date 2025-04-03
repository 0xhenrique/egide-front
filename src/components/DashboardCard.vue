<template>
  <div class="dashboard-card card">
    <div class="card-header">
      <h3>{{ title }}</h3>
    </div>
    <div class="card-body">
      <slot></slot>
    </div>
    <div class="card-footer">
      <button class="btn btn-secondary" @click="handleButtonClick">{{ buttonText }}</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DashboardCard',
  props: {
    title: {
      type: String,
      required: true
    },
    buttonText: {
      type: String,
      default: 'View Details'
    }
  },
  emits: ['button-click'],
  setup(props, { emit }) {
    const handleButtonClick = () => {
      emit('button-click')
    }
    
    return {
      handleButtonClick
    }
  }
})
</script>

<style>
.toast-container {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: var(--z-index-tooltip);
}

.toast {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 250px;
  max-width: 400px;
  padding: 1rem;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-md);
  animation: toast-slide-in 0.3s ease;
}

.toast-error {
  background-color: var(--color-error-bg);
  color: var(--color-error);
  border-left: 4px solid var(--color-error);
}

.toast-success {
  background-color: var(--color-success-bg);
  color: var(--color-success);
  border-left: 4px solid var(--color-success);
}

.toast-info {
  background-color: var(--color-info-bg);
  color: var(--color-info);
  border-left: 4px solid var(--color-info);
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
