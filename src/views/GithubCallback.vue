<template>
  <div class="auth-callback">
    <p>Processing authentication...</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'

export default defineComponent({
  name: 'AuthCallback',
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()
    
    onMounted(() => {
      // Process authentication data from URL hash
      const success = authStore.parseAuthCallback()
      
      if (success) {
        router.push('/')
      } else {
        router.push('/login')
      }
    })
    
    return {}
  }
})
</script>
