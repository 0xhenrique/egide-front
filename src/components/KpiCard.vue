<template>
  <div class="kpi-card" :class="{ 'positive-change': isPositiveChange, 'negative-change': isNegativeChange }">
    <div class="kpi-content">
      <div class="kpi-header">
        <div class="kpi-title">{{ title }}</div>
        <div class="kpi-subtitle">{{ subtitle }}</div>
      </div>
      <div class="kpi-value-container">
        <div class="kpi-value">{{ formattedValue }}</div>
        <div v-if="showChange" class="kpi-change" :class="{ 'increase': isPositiveIndicator, 'decrease': !isPositiveIndicator }">
          <span class="change-arrow">{{ isPositiveIndicator ? '↑' : '↓' }}</span>
          <span class="change-value">{{ Math.abs(changeValue) }}% from yesterday</span>
        </div>
        <div v-if="subvalue" class="kpi-subvalue">{{ subvalue }}</div>
      </div>
    </div>
    <div class="kpi-icon" :class="iconClass">
      <span class="icon-inner"></span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'KpiCard',
  props: {
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      default: ''
    },
    value: {
      type: [Number, String],
      required: true
    },
    format: {
      type: String,
      default: 'number' // 'number', 'percent', 'time', 'text'
    },
    changeValue: {
      type: Number,
      default: 0
    },
    positiveIsGood: {
      type: Boolean,
      default: true // For most metrics, an increase is good, but not for all (like response time)
    },
    showChange: {
      type: Boolean,
      default: true
    },
    icon: {
      type: String,
      default: 'default' // 'globe', 'shield', 'clock', 'bolt'
    },
    subvalue: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    // Format the value based on the format prop
    const formattedValue = computed(() => {
      switch (props.format) {
        case 'number':
          return typeof props.value === 'number' 
            ? props.value.toLocaleString() 
            : props.value;
        case 'percent':
          return typeof props.value === 'number' 
            ? `${props.value}%` 
            : props.value;
        case 'time':
          return props.value;
        default:
          return props.value;
      }
    });

    // Determine if the change is positive (increase) or negative (decrease)
    const isPositiveChange = computed(() => props.changeValue > 0);
    const isNegativeChange = computed(() => props.changeValue < 0);

    // Determine if the change is a positive indicator
    // For metrics like response time, a decrease is actually good
    const isPositiveIndicator = computed(() => {
      return props.positiveIsGood ? isPositiveChange.value : isNegativeChange.value;
    });

    // Determine the icon class based on the icon prop
    const iconClass = computed(() => {
      return `icon-${props.icon}`;
    });

    return {
      formattedValue,
      isPositiveChange,
      isNegativeChange,
      isPositiveIndicator,
      iconClass
    };
  }
});
</script>

<style>
.kpi-card {
  background-color: var(--color-background-secondary, #3c3836);
  border-radius: var(--border-radius, 4px);
  border-style: solid;
  border-width: 1px;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  box-shadow: var(--shadow-sm, 0 1px 3px rgba(0, 0, 0, 0.12));
}

.kpi-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 1;
}

.kpi-header {
  margin-bottom: 0.5rem;
}

.kpi-title {
  font-size: 1.1rem;
  font-weight: var(--font-weight-medium, 500);
  color: var(--color-text-primary, #ebdbb2);
  margin-bottom: 0.25rem;
}

.kpi-subtitle {
  font-size: 0.8rem;
  color: var(--color-text-tertiary, #a89984);
}

.kpi-value-container {
  display: flex;
  flex-direction: column;
}

.kpi-value {
  font-size: 1.75rem;
  font-weight: var(--font-weight-bold, 700);
  color: var(--color-text-primary, #ebdbb2);
  margin-bottom: 0.25rem;
}

.kpi-subvalue {
  font-size: 0.85rem;
  color: var(--color-text-secondary, #bdae93);
  margin-top: 0.25rem;
}

.kpi-change {
  display: flex;
  align-items: center;
  font-size: 0.8rem;
}

.kpi-change.increase {
  color: var(--color-success, #b8bb26);
}

.kpi-change.decrease {
  color: var(--color-error, #fb4934);
}

.change-arrow {
  margin-right: 0.25rem;
}

.kpi-icon {
  position: relative;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.5;
}

/* Icon styles */
.icon-globe .icon-inner:before {
  content: '🌐';
}

.icon-shield .icon-inner:before {
  content: '🛡️';
}

.icon-clock .icon-inner:before {
  content: '⏱️';
}

.icon-bolt .icon-inner:before {
  content: '⚡';
}

.icon-default .icon-inner:before {
  content: '📊';
}
</style>
