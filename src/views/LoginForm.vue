<template>
  <div class="flex items-center justify-center h-screen">
    <Card>
      <form @submit.prevent="handleLogin" class="space-y-4 xs:min-w-sm">
        <h2 class="primary-title text-center">Login</h2>
        <input v-model="email" placeholder="Email" class="input" required @input="clearError" />
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="input"
          required
          @input="clearError"
        />
        <button type="submit" class="button-primary" :disabled="loading">
          <span v-if="loading">Logging in...</span>
          <span v-else>Login</span>
        </button>
        <p v-if="errorMessage" class="text-red-500 text-sm">{{ errorMessage }}</p>
        <p class="secondary-title text-center">
          Don't have an account?
          <span @click="$router.push('/register')" class="text-blue-500 cursor-pointer"
            >Register</span
          >
        </p>
      </form>
    </Card>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import Card from '../components/CardComponent.vue'

export default defineComponent({
  components: { Card },
  setup() {
    const authStore = useAuthStore()
    const email = ref('')
    const password = ref('')
    const loading = ref(false)

    async function handleLogin() {
      loading.value = true
      try {
        await authStore.login(email.value, password.value)
      } catch (err) {
        console.error('Error during login:', err)
      } finally {
        loading.value = false
      }
    }

    function clearError() {
      authStore.errorMessage = ''
    }

    return {
      email,
      password,
      handleLogin,
      loading,
      errorMessage: computed(() => authStore.errorMessage),
      clearError,
    }
  },
})
</script>

<!-- <style scoped src="../assets/styles/forms.css"></style> -->
