<template>
	<div class="auth-form">
		<div class="github-login">
			<button @click="handleGithubLogin" class="btn github-btn">
				<span class="github-icon"></span>
				Login with GitHub
			</button>
		</div>
	</div>
</template>

<script lang="ts">
 import { defineComponent } from 'vue'
 import { useAuthStore } from '@/store/auth'

 export default defineComponent({
	 name: 'LoginForm',
	 emits: ['close'],
	 setup() {
		 const authStore = useAuthStore()
		 
		 const handleGithubLogin = async () => {
			 authStore.githubLogin()
		 }
		 
		 return {
			 handleGithubLogin
		 }
	 }
 })
</script>

<style>
.auth-form {
  width: 100%;
}

.github-login {
  margin-bottom: 1.5rem;
}

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

.github-icon {
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-right: 10px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='%23ebdbb2' d='M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}
</style>
