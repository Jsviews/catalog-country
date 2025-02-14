import { apiServices } from '@/services'
import type { Country } from '@/stores/countryStore'

export const useCountry = () => {
  async function fetchCountries(): Promise<Country[]> {
    try {
      const { data } = await apiServices.country.query({})
      return data
    } catch (error) {
      console.error('Error fetching countries:', error)
      return []
    }
  }

  return { fetchCountries }
}
