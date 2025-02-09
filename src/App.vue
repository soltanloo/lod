<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from './stores/auth'

const authStore = useAuthStore()

async function handleLogout() {
  authStore.logout()
}
</script>

<template>
  <header class="p-4 bg-background-main primary-title absolute top-0 left-0 w-screen">
    <div class="container mx-auto flex justify-between items-center">
      <nav>
        <RouterLink to="/" class="mr-4">Home</RouterLink>
        <RouterLink v-if="!authStore.isAuthenticated" to="/login" class="mr-4">Login</RouterLink>
        <RouterLink v-if="!authStore.isAuthenticated" to="/register">Register</RouterLink>
      </nav>
      <span v-if="authStore.isAuthenticated && authStore.user" class="ml-auto mr-4 hidden sm:block"
        >Welcome, {{ authStore.user.email }}</span
      >
      <button
        v-if="authStore.isAuthenticated"
        @click="handleLogout"
        class="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  </header>

  <RouterView class="px-2" />
</template>

<style src="./assets/styles/global.css"></style>
