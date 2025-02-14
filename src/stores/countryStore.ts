import { defineStore } from 'pinia'
import { useCountry } from '@/components/composable/useCountry'

const { fetchCountries } = useCountry()
export interface Country {
  name: {
    official: string
    nativeName?: Record<string, { common: string }>
  }
  cca2: string
  cca3: string
  altSpellings: string[]
  idd?: {
    root: string
    suffixes?: string[]
  }
  flags: {
    png: string
  }
}

export interface CountryState {
  countries: Country[]
  searchQuery: string
  sortAscending: boolean
  selectedCountry: Country | null
  currentPage: number
  totalPages: number
  itemsPerPage: number
  filteredCountries: Country[]
}

export const useCountryStore = defineStore('coutryStore', {
  state: (): CountryState => ({
    countries: [],
    searchQuery: '',
    sortAscending: true,
    selectedCountry: null,
    currentPage: 1,
    totalPages: 1,
    itemsPerPage: 25,
    filteredCountries: [],
  }),
  getters: {
    filteredCountries(state): Country[] {
      return state.countries
        .filter((c) => c.name.official.toLowerCase().includes(state.searchQuery.toLowerCase()))
        .sort((a, b) =>
          state.sortAscending
            ? a.name.official.localeCompare(b.name.official)
            : b.name.official.localeCompare(a.name.official),
        )
    },
    paginatedCountries(state): Country[] {
      const start = (state.currentPage - 1) * state.itemsPerPage
      return this.filteredCountries.slice(start, start + state.itemsPerPage)
    },
    totalPages(state): number {
      return Math.ceil(this.filteredCountries.length / state.itemsPerPage)
    },
  },
  actions: {
    async loadCountries(): Promise<void> {
      this.countries = await fetchCountries()
    },
    selectCountry(country: Country): void {
      this.selectedCountry = country
    },
    nextPage(): void {
      if (this.currentPage < this.totalPages) this.currentPage++
    },
    prevPage(): void {
      if (this.currentPage > 1) this.currentPage--
    },
    toggleSort(): void {
      this.sortAscending = !this.sortAscending
    },
  },
})
