<template>
  <div class="app">
    <router-view />
    <ThemeDebugger />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ThemeDebugger from '@/components/ThemeDebugger.vue'

export default defineComponent({
  name: 'App',
  components: {
    ThemeDebugger
  }
})
</script>

<style>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
