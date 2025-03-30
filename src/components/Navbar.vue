<template>
  <nav class="navbar">
    <div class="container">
      <div class="navbar-brand">
        <h1>Reverse-Proxy Shield</h1>
      </div>

      <div class="navbar-menu">
        <div v-if="authStore.isAuthenticated" class="navbar-end">
          <span class="navbar-user">Welcome, {{ authStore.user?.name }}</span>

          <button class="btn btn-secondary logout-btn" @click="logout">
            <span class="logout-icon"></span>
            Logout
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAuthStore } from '@/store/auth'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'Navbar',
  setup() {
    const authStore = useAuthStore()
    const router = useRouter()

    const logout = () => {
      authStore.logout()
      router.push('/landing')
    }

    return {
      authStore,
      logout
    }
  }
})
</script>

<style>
.navbar {
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem 0;
}

.navbar .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-brand h1 {
  font-size: 1.5rem;
  margin: 0;
  color: var(--primary-color);
}

.navbar-menu {
  display: flex;
}

.navbar-end {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.navbar-user {
  font-weight: 500;
}

.logout-btn {
  display: flex;
  align-items: center;
  gap: 8px;
}

.logout-icon {
  display: inline-block;
  width: 16px;
  height: 16px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='%234a6fa5' d='M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}
</style>
