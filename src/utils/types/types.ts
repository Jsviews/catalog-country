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
