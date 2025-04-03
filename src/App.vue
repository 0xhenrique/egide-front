<template>
  <div class="app">
    <router-view />
    <ThemeSwitcher class="theme-switcher-corner" />
    <ThemeDebugger />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ThemeDebugger from '@/components/ThemeDebugger.vue'
import ThemeSwitcher from '@/components/ThemeSwitcher.vue'

export default defineComponent({
  name: 'App',
  components: {
    ThemeDebugger,
    ThemeSwitcher
  }
})
</script>

<style>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.theme-switcher-corner {
  position: fixed;
  bottom: 20px;
  left: 20px;
  z-index: 9998;
}
</style>
