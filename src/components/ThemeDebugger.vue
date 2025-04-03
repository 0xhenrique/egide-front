<template>
  <div class="theme-debugger" :class="{ 'collapsed': !isVisible }">
    <div class="theme-debugger-header" @click="toggleVisibility">
      <h3>Gruvbox</h3>
      <button class="theme-debugger-close" @click.stop="toggleVisibility">
        {{ isVisible ? '×' : '+' }}
      </button>
    </div>
    
    <div class="theme-debugger-body" v-if="isVisible">
      <div class="theme-section">
        <h4>Colors</h4>
        <div class="color-grid">
          <div v-for="(colorName, i) in colorGroups.base" :key="i" class="color-item">
            <div class="color-preview" :style="{ backgroundColor: `var(${colorName})` }"></div>
            <div class="color-name">{{ colorName }}</div>
          </div>
        </div>
      </div>
      
      <div class="theme-section">
        <h4>Accent Colors</h4>
        <div class="color-grid">
          <div v-for="(colorName, i) in colorGroups.accent" :key="i" class="color-item">
            <div class="color-preview" :style="{ backgroundColor: `var(${colorName})` }"></div>
            <div class="color-name">{{ colorName }}</div>
          </div>
        </div>
      </div>
      
      <div class="theme-section">
        <h4>Semantic Colors</h4>
        <div class="color-grid">
          <div v-for="(colorName, i) in colorGroups.semantic" :key="i" class="color-item">
            <div class="color-preview" :style="{ backgroundColor: `var(${colorName})` }"></div>
            <div class="color-name">{{ colorName }}</div>
          </div>
        </div>
      </div>
      
      <div class="theme-section">
        <h4>Typography</h4>
        <div class="type-sample">
          <h1>Heading 1</h1>
          <h2>Heading 2</h2>
          <h3>Heading 3</h3>
          <p>Regular paragraph text</p>
          <p><small>Small text</small></p>
          <p><a href="#">Link styling</a></p>
          <p><strong>Bold text</strong></p>
        </div>
      </div>
      
      <div class="theme-section">
        <h4>Components</h4>
        <div class="component-samples">
          <div class="button-samples">
            <button class="btn">Primary Button</button>
            <button class="btn btn-secondary">Secondary Button</button>
          </div>
          
          <div class="form-samples">
            <div class="form-group">
              <input type="text" class="form-control" placeholder="Input field" />
            </div>
          </div>
          
          <div class="badge-samples">
            <span class="badge badge-success">Success</span>
            <span class="badge badge-warning">Warning</span>
            <span class="badge badge-error">Error</span>
            <span class="badge badge-info">Info</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'ThemeDebugger',
  setup() {
    const isVisible = ref(false)
    
    const colorGroups = {
      base: [
        '--gruvbox-dark0-hard',
        '--gruvbox-dark0',
        '--gruvbox-dark0-soft',
        '--gruvbox-dark1',
        '--gruvbox-dark2',
        '--gruvbox-dark3',
        '--gruvbox-dark4',
        '--gruvbox-light0-hard',
        '--gruvbox-light0',
        '--gruvbox-light0-soft',
        '--gruvbox-light1',
        '--gruvbox-light2',
        '--gruvbox-light3',
        '--gruvbox-light4'
      ],
      accent: [
        '--gruvbox-bright-red',
        '--gruvbox-bright-green',
        '--gruvbox-bright-yellow',
        '--gruvbox-bright-blue',
        '--gruvbox-bright-purple',
        '--gruvbox-bright-aqua',
        '--gruvbox-bright-orange',
        '--gruvbox-neutral-red',
        '--gruvbox-neutral-green',
        '--gruvbox-neutral-yellow',
        '--gruvbox-neutral-blue',
        '--gruvbox-neutral-purple',
        '--gruvbox-neutral-aqua',
        '--gruvbox-neutral-orange'
      ],
      semantic: [
        '--color-background-primary',
        '--color-background-secondary',
        '--color-text-primary',
        '--color-text-secondary',
        '--color-primary',
        '--color-secondary',
        '--color-accent',
        '--color-success',
        '--color-warning',
        '--color-error',
        '--color-info'
      ]
    }
    
    const toggleVisibility = () => {
      isVisible.value = !isVisible.value
    }
    
    return {
      isVisible,
      colorGroups,
      toggleVisibility
    }
  }
})
</script>

<style>
.theme-debugger {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 350px;
  max-height: 80vh;
  background-color: var(--color-background-secondary);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
  z-index: 9999;
  transition: all var(--transition-base);
}

.theme-debugger.collapsed {
  width: 120px;
  max-height: 40px;
}

.theme-debugger-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-sm) var(--space-md);
  background-color: var(--color-background-tertiary);
  cursor: pointer;
}

.theme-debugger-header h3 {
  margin: 0;
  font-size: 1rem;
  color: var(--color-text-primary);
}

.theme-debugger-close {
  background: none;
  border: none;
  color: var(--color-text-secondary);
  font-size: 1.25rem;
  cursor: pointer;
}

.theme-debugger-body {
  max-height: calc(80vh - 40px);
  overflow-y: auto;
  padding: var(--space-md);
}

.theme-section {
  margin-bottom: var(--space-lg);
}

.theme-section h4 {
  margin-bottom: var(--space-sm);
  color: var(--color-text-primary);
  border-bottom: 1px solid var(--color-border);
  padding-bottom: var(--space-xs);
}

.color-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-sm);
}

.color-item {
  display: flex;
  align-items: center;
  margin-bottom: var(--space-xs);
}

.color-preview {
  width: 24px;
  height: 24px;
  border-radius: var(--border-radius-sm);
  margin-right: var(--space-sm);
  border: 1px solid var(--color-border);
}

.color-name {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.type-sample h1,
.type-sample h2,
.type-sample h3 {
  margin-bottom: var(--space-xs);
}

.component-samples {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.button-samples, .badge-samples {
  display: flex;
  gap: var(--space-sm);
  flex-wrap: wrap;
}

.form-samples {
  width: 100%;
}
</style>
