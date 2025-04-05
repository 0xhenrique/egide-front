<template>
  <div class="theme-switcher">
    <button 
      class="theme-btn" 
      @click="toggleTheme" 
      :title="`Switch to ${nextTheme} theme`"
    >
	  <p>Change theme</p>
      <span class="theme-icon" :class="currentTheme">Change theme</span>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from 'vue'

type Theme = 'gruvbox' | 'tokyo-night'

export default defineComponent({
  name: 'ThemeSwitcher',
  setup() {
    const currentTheme = ref<Theme>('gruvbox')
    
    const getNextTheme = (): Theme => {
      return currentTheme.value === 'gruvbox' ? 'tokyo-night' : 'gruvbox'
    }
    
    const nextTheme = ref<Theme>(getNextTheme())
    
    const loadTheme = () => {
      const savedTheme = localStorage.getItem('theme') as Theme | null
      if (savedTheme && (savedTheme === 'gruvbox' || savedTheme === 'tokyo-night')) {
        currentTheme.value = savedTheme
        nextTheme.value = getNextTheme()
      }
      
      applyTheme()
    }
    
    const applyTheme = () => {
      document.documentElement.classList.remove('theme-gruvbox', 'theme-tokyo-night')
      document.documentElement.classList.add(`theme-${currentTheme.value}`)
      if (currentTheme.value === 'tokyo-night') {
        ensureStylesheetLoaded('/src/assets/tokyo-night.css')
      }
    }
    
    const ensureStylesheetLoaded = (href: string) => {
      const existingLink = document.querySelector(`link[href="${href}"]`)
      if (!existingLink) {
        // Create and append link if not loaded
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = href
        document.head.appendChild(link)
      }
    }
    
    const toggleTheme = () => {
      currentTheme.value = nextTheme.value
      nextTheme.value = getNextTheme()
      localStorage.setItem('theme', currentTheme.value)
      applyTheme()
    }
    
    onMounted(() => {
      loadTheme()
      
      // Default to gruvbox theme by adding it as a base theme class
      if (!document.documentElement.classList.contains('theme-gruvbox') && 
          !document.documentElement.classList.contains('theme-tokyo-night')) {
        document.documentElement.classList.add('theme-gruvbox')
      }
    })
    
    watch(currentTheme, () => {
      nextTheme.value = getNextTheme()
    })
    
    return {
      currentTheme,
      nextTheme,
      toggleTheme
    }
  }
})
</script>

<style>
.theme-switcher {
  display: inline-flex;
  align-items: center;
}

.theme-btn {
  background: none;
  width: 100%;
  border: solid 1px var(--color-border);
  cursor: pointer;
  padding: 0.5rem 0.75rem;
  border-radius: var(--border-radius);
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: background-color var(--transition-base);
}

.theme-btn p {
	color: var(--color-text-primary);
}

.theme-btn:hover {
  background-color: var(--color-background-tertiary);
}

.theme-icon {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  position: relative;
  overflow: hidden;
}

.theme-icon.gruvbox::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #fb4934 0%, #b8bb26 33%, #83a598 66%, #d3869b 100%);
  border-radius: 50%;
}

.theme-icon.tokyo-night::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #f7768e 0%, #9ece6a 33%, #7aa2f7 66%, #bb9af7 100%);
  border-radius: 50%;
}
</style>
