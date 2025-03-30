<template>
  <div class="auth-form">
    <div class="github-login">
      <button @click="handleGithubLogin" class="btn github-btn">
        <span class="github-icon"></span>
        Sign up with GitHub
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useAuthStore } from '@/store/auth'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'RegisterForm',
  emits: ['close'],
  setup(props, { emit }) {
    const authStore = useAuthStore()
    const router = useRouter()
    const error = ref('')
    const isLoading = ref(false)
    
    const handleGithubLogin = async () => {
      error.value = ''
      isLoading.value = true
      
      try {
        // @TODO: add redirect to github
        const success = await authStore.githubLogin()
        
        if (success) {
          emit('close')
          router.push('/')
        } else {
          error.value = 'GitHub sign up failed'
        }
      } catch (err) {
        error.value = 'An error occurred during GitHub sign up'
        console.error(err)
      } finally {
        isLoading.value = false
      }
    }
    
    return {
      handleGithubLogin
    }
  }
})
</script>

<style>
.github-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #24292e;
  color: white;
  transition: background-color 0.2s ease;
}

.github-btn:hover {
  background-color: #1b1f23;
}
</style>
