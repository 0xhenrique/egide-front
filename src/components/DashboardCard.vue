<template>
  <div class="dashboard-card">
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

<style scoped>
.dashboard-card {
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.card-header {
  padding: 1.25rem;
  border-bottom: 1px solid #e9ecef;
  background-color: #f8f9fa;
}

.card-header h3 {
  margin: 0;
  font-size: 1.25rem;
  color: var(--primary-color);
}

.card-body {
  padding: 1.5rem;
  flex: 1;
}

.card-footer {
  padding: 1rem 1.25rem;
  border-top: 1px solid #e9ecef;
  background-color: #f8f9fa;
}
</style>
