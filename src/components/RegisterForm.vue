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
import { defineComponent, ref } from 'vue'
import { useAuthStore } from '@/store/auth'
// import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'RegisterForm',
  emits: ['close'],
  setup(_props, { emit }) {
    const authStore = useAuthStore()
    // const router = useRouter()
    const error = ref('')
    const isLoading = ref(false)
    
    // const handleGithubLogin = async () => {
    //   error.value = ''
    //   isLoading.value = true
      
    //   try {
    //     // @TODO: add redirect to github
    //     const success = authStore.githubLogin()
        
    //     if (success) {
    //       emit('close')
    //       router.push('/')
    //     } else {
    //       error.value = 'GitHub sign up failed'
    //     }
    //   } catch (err) {
    //     error.value = 'An error occurred during GitHub sign up'
    //     console.error(err)
    //   } finally {
    //     isLoading.value = false
    //   }
    // }
    const handleGithubLogin = async () => {
      error.value = ''
      isLoading.value = true
      
      try {
        await authStore.githubLogin()
        emit('close')
      } catch (err) {
        error.value = 'An error occurred during GitHub sign up'
        console.error(err)
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
  background-color: var(--gruvbox-dark0-hard);
  color: var(--color-text-primary);
  transition: background-color var(--transition-base);
}

.github-btn:hover {
  background-color: var(--gruvbox-dark0-soft);
}
</style>
