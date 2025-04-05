<template>
  <div 
    class="verification-badge" 
    :class="badgeClass" 
    @click.stop="handleClick"
    :title="badgeTitle"
  >
    <span class="badge-icon">{{ badgeIcon }}</span>
    <span class="badge-text">{{ badgeText }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'VerificationBadge',
  props: {
    verified: {
      type: Boolean,
      default: false
    },
    clickable: {
      type: Boolean,
      default: true
    }
  },
  emits: ['click'],
  setup(props, { emit }) {
    const badgeClass = computed(() => {
      return {
        'verified': props.verified,
        'unverified': !props.verified,
        'clickable': props.clickable
      }
    })
    
    const badgeIcon = computed(() => {
      return props.verified ? '✓' : '!'
    })
    
    const badgeText = computed(() => {
      return props.verified ? 'Verified' : 'Needs Setup'
    })
    
    const badgeTitle = computed(() => {
      return props.verified 
        ? 'DNS verification successful' 
        : 'Click to set up DNS configuration'
    })
    
    const handleClick = () => {
      if (props.clickable) {
        emit('click')
      }
    }
    
    return {
      badgeClass,
      badgeIcon,
      badgeText,
      badgeTitle,
      handleClick
    }
  }
})
</script>

<style scoped>
.verification-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: var(--font-weight-medium);
  white-space: nowrap;
}

.verification-badge.verified {
  background-color: var(--color-success-bg);
  color: var(--color-success);
}

.verification-badge.unverified {
  background-color: var(--color-warning-bg);
  color: var(--color-warning);
}

.verification-badge.clickable {
  cursor: pointer;
  transition: transform var(--transition-base), box-shadow var(--transition-base);
}

.verification-badge.clickable:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-sm);
}

.badge-icon {
  margin-right: 0.25rem;
  font-weight: var(--font-weight-bold);
}
</style>
