// src/stores/auth.ts
import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { auth } from '../firebase'
import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  type User,
} from 'firebase/auth'
import router from '@/router'

// Map Firebase error codes to human-readable messages
const firebaseErrorMessages: { [key: string]: string } = {
  'auth/invalid-email': 'Please enter a valid email address.',
  'auth/user-disabled': 'This account has been disabled.',
  'auth/user-not-found': 'No account found with this email address.',
  'auth/wrong-password': 'Incorrect password. Please try again.',
  'auth/email-already-in-use': 'This email address is already in use.',
  'auth/weak-password': 'Password should be at least 6 characters long.',
  'auth/operation-not-allowed': 'This operation is not allowed. Please contact support.',
  'auth/network-request-failed': 'A network error occurred. Please check your internet connection.',
  'auth/too-many-requests': 'Too many requests. Please try again later.',
  'auth/invalid-credential': 'Invalid credentials. Please check your email and password.',
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(JSON.parse(localStorage.getItem('user') || 'null'))
  const errorMessage = ref('')
  const isAuthenticated = computed(() => user.value !== null)

  // Monitor Firebase authentication state changes
  function monitorAuthState() {
    onAuthStateChanged(auth, (currentUser) => {
      user.value = currentUser || null
      updateLocalStorage()
    })
  }

  // Register a new user
  async function register(email: string, password: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      user.value = userCredential.user
      errorMessage.value = ''
      updateLocalStorage()
      router.push('/')
    } catch (error) {
      const typedError = error as { code: string }
      errorMessage.value =
        firebaseErrorMessages[typedError.code] || 'Registration failed. Please try again.'
    }
  }

  // Login an existing user
  async function login(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      user.value = userCredential.user
      errorMessage.value = ''
      updateLocalStorage()
      router.push('/')
    } catch (error) {
      const typedError = error as { code: string }
      errorMessage.value =
        firebaseErrorMessages[typedError.code] || 'Login failed. Please try again.'
    }
  }

  // Logout the user
  async function logout() {
    try {
      await signOut(auth)
      user.value = null
      errorMessage.value = ''
      updateLocalStorage()
      router.push('/login')
    } catch (error) {
      const typedError = error as { message: string }
      errorMessage.value = typedError?.message || 'Logout failed.'
    }
  }

  // Sync user state to localStorage
  function updateLocalStorage() {
    if (user.value) {
      localStorage.setItem('user', JSON.stringify(user.value))
    } else {
      localStorage.removeItem('user')
    }
  }

  // Watch user state and sync to localStorage
  watch(user, updateLocalStorage)

  // Call monitorAuthState on initialization
  monitorAuthState()

  return { user, errorMessage, isAuthenticated, register, login, logout }
})
