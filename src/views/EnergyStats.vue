<template>
  <div class="flex justify-center items-center h-screen" :class="{ 'animate-pulse': loading }">
    <Card>
      <TimeData
        :startDate="energyData.startDate"
        :endDate="energyData.endDate"
        :duration="energyData.duration"
      />
      <div class="grid grid-cols-1 gap-2 py-1 xs:grid-cols-3">
        <StatBlock title="Power Latest" :value="energyData.powerLatest" />
        <StatBlock title="Power Min" :value="energyData.powerMin" />
        <StatBlock title="Power Max" :value="energyData.powerMax" />
      </div>

      <div v-if="errorMessage" class="secondary-title mt-4">
        {{ errorMessage }}
      </div>
    </Card>
    <div
      class="fixed bottom-2 right-2 secondary-title bg-background-main bg-opacity-75 rounded py-1 px-2 shadow"
    >
      Last updated: {{ lastUpdated }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, defineAsyncComponent, onUnmounted } from 'vue'
import { useEnergyStore } from '@/stores/energy'
import { storeToRefs } from 'pinia'
const Card = defineAsyncComponent(() => import('../components/CardComponent.vue'))
const StatBlock = defineAsyncComponent(() => import('../components/energy-data/StatBlock.vue'))
const TimeData = defineAsyncComponent(() => import('../components/energy-data/TimeData.vue'))

export default defineComponent({
  components: { Card, StatBlock, TimeData },
  setup() {
    const energyStore = useEnergyStore()
    const { loading, errorMessage } = storeToRefs(energyStore)

    const lastUpdated = ref<string>('')
    const energyData = ref({
      startDate: '',
      endDate: '',
      duration: '',
      powerLatest: 0,
      powerMin: 0,
      powerMax: 0,
    })

    async function loadEnergyData() {
      try {
        await energyStore.fetchData()
        const { startDate, endDateTime, powerLatest, powerMin, powerMax } = energyStore.energyData
        energyData.value = {
          startDate,
          endDate: new Date(endDateTime).toISOString().split('T')[0],
          duration: new Date(endDateTime).toISOString().split('T')[1].split('.')[0],
          powerLatest,
          powerMin,
          powerMax,
        }
        lastUpdated.value = new Date().toLocaleString()
      } catch (error) {
        console.error('Failed to load energy data:', error instanceof Error ? error.message : error)
      }
    }

    const REFRESH_INTERVAL = 60000
    let intervalId: number

    onMounted(() => {
      loadEnergyData()
      intervalId = setInterval(loadEnergyData, REFRESH_INTERVAL)
    })

    onUnmounted(() => {
      clearInterval(intervalId)
    })

    return { energyData, loading, errorMessage, lastUpdated }
  },
})
</script>
