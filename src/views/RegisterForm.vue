<template>
  <div class="flex items-center justify-center h-screen">
    <Card>
      <form @submit.prevent="handleRegister" class="space-y-4 xs:min-w-sm">
        <h2 class="primary-title text-center">Register</h2>
        <input
          type="email"
          v-model="email"
          placeholder="Email"
          class="input"
          required
          @input="clearError"
        />
        <input
          type="password"
          v-model="password"
          placeholder="Password"
          class="input"
          required
          @input="clearError"
        />
        <input
          type="password"
          v-model="confirmPassword"
          placeholder="Confirm Password"
          class="input"
          required
          @input="clearError"
        />
        <button type="submit" class="button-primary" :disabled="loading">
          <span v-if="loading">Registering...</span>
          <span v-else>Register</span>
        </button>
        <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>
        <p class="secondary-title text-center">
          Already have an account?
          <span @click="goToLogin" class="text-blue-500 cursor-pointer">Login</span>
        </p>
      </form>
    </Card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import Card from '../components/CardComponent.vue'

export default defineComponent({
  components: { Card },
  setup() {
    const email = ref('')
    const password = ref('')
    const confirmPassword = ref('')
    const router = useRouter()
    const authStore = useAuthStore()
    const loading = ref(false)

    const errorMessage = computed(() => authStore.errorMessage)

    async function handleRegister() {
      if (password.value !== confirmPassword.value) {
        authStore.errorMessage = 'Passwords do not match!'
        return
      }

      loading.value = true
      await authStore.register(email.value, password.value)
      loading.value = false
    }

    function goToLogin() {
      router.push('/login')
    }

    function clearError() {
      authStore.errorMessage = ''
    }

    return {
      email,
      password,
      confirmPassword,
      handleRegister,
      goToLogin,
      loading,
      errorMessage,
      clearError,
    }
  },
})
</script>

<!-- <style scoped src="../assets/styles/forms.css"></style> -->
