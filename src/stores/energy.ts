import { defineStore } from 'pinia'
import { ref } from 'vue'
import { fetchEnergyData, type EnergyData } from '../services/api'

export const useEnergyStore = defineStore('energy', () => {
  const energyData = ref<EnergyData>({
    startDate: '',
    endDateTime: '',
    powerLatest: 0,
    powerMin: 0,
    powerMax: 0,
  })
  const loading = ref(false)
  const errorMessage = ref('')

  async function fetchData() {
    errorMessage.value = ''
    loading.value = true
    try {
      energyData.value = await fetchEnergyData()
    } catch (error) {
      errorMessage.value = (error as Error)?.message || 'Failed to fetch energy data.'
    } finally {
      loading.value = false
    }
  }

  return { energyData, loading, errorMessage, fetchData }
})
