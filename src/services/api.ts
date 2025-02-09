import axios from 'axios'

const API_URL = '/api/energy' // Use the proxy path
const API_KEY = import.meta.env.VITE_API_KEY

export interface EnergyData {
  startDate: string
  endDateTime: string
  powerLatest: number
  powerMin: number
  powerMax: number
}

export async function fetchEnergyData(): Promise<EnergyData> {
  try {
    const response = await axios.get(`${API_URL}?algorithm=sha256&mode=realtime`, {
      headers: {
        accept: 'application/json',
        'x-api-key': API_KEY,
      },
    })

    // Extract and return the relevant data
    const realtimeData = response.data?.data?.realtime?.[0]
    if (!realtimeData) throw new Error('No data available')

    return {
      startDate: realtimeData.start_date,
      endDateTime: realtimeData.end_datetime,
      powerLatest: realtimeData.power_latest,
      powerMin: realtimeData.power_min,
      powerMax: realtimeData.power_max,
    }
  } catch (error) {
    console.error('Error fetching energy data:', error instanceof Error ? error.message : error)
    throw new Error('Failed to fetch energy data. Please try again later.')
  }
}
