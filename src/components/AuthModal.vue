<template>
  <div class="modal-backdrop" @click.self="closeModal">
    <div class="modal">
      <div class="modal-header">
        <h2 class="modal-title">{{ isLogin ? 'Login' : 'Register' }}</h2>
        <button class="modal-close" @click="closeModal">&times;</button>
      </div>
      <div class="modal-body">
        <LoginForm v-if="isLogin" @close="closeModal" />
        <RegisterForm v-else @close="closeModal" />
      </div>
      <div class="modal-footer auth-toggle">
        <p>
          {{ isLogin ? "Don't have an account?" : "Already have an account?" }}
          <a href="#" @click.prevent="toggleAuthMode">
            {{ isLogin ? 'Register' : 'Login' }}
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import LoginForm from './LoginForm.vue'
import RegisterForm from './RegisterForm.vue'

export default defineComponent({
  name: 'AuthModal',
  components: {
    LoginForm,
    RegisterForm
  },
  props: {
    initialMode: {
      type: String,
      default: 'login',
      validator: (value: string) => ['login', 'register'].includes(value)
    }
  },
  emits: ['close'],
  setup(props, { emit }) {
    const isLogin = ref(props.initialMode === 'login')
    
    const closeModal = () => {
      emit('close')
    }
    
    const toggleAuthMode = () => {
      isLogin.value = !isLogin.value
    }
    
    return {
      isLogin,
      closeModal,
      toggleAuthMode
    }
  }
})
</script>

<style>
.auth-toggle {
  margin-top: var(--space-md);
  text-align: center;
  justify-content: center;
}

.auth-toggle p {
  margin: 0;
  color: var(--color-text-secondary);
}

.auth-toggle a {
  color: var(--color-accent);
  font-weight: var(--font-weight-medium);
}

.auth-toggle a:hover {
  color: var(--gruvbox-bright-orange);
}
</style>
