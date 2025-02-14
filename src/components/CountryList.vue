<script setup lang="ts">
import { onMounted } from 'vue'
import { useCountryStore } from '@/stores/countryStore.ts'
import CountryModal from './CountryModal.vue'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from './ui/button'
import { Input } from './ui/input'
const countryStore = useCountryStore()

onMounted(() => {
  countryStore.loadCountries()
})
</script>

<template>
  <div class="container mx-auto p-5">
    <h1 class="text-2xl font-bold mb-4">🌍 Countries Catalog</h1>

    <!-- Search & Sort -->
    <div class="flex gap-2 items-center py-4">
      <Input
        v-model="countryStore.searchQuery"
        placeholder="Search by country name..."
        class="p-2 border rounded w-full"
      />
      <Button
        variant="outline"
        size="lg"
        @click="countryStore.toggleSort()"
        :disabled="countryStore.currentPage === countryStore.totalPages"
      >
        <span> Sort {{ countryStore.sortAscending ? '⬆ ' : '⬇ ' }} </span>
      </Button>
    </div>

    <!-- Table -->
    <div class="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead class="font-bold w-[100px]">Flag</TableHead>
            <TableHead class="font-bold">Country Name</TableHead>
            <TableHead class="font-bold w-[100px]">Code 2</TableHead>
            <TableHead class="font-bold w-[100px]">Code 3</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="country in countryStore.paginatedCountries" :key="country.cca2">
            <TableCell>
              <img :src="country.flags.png" :alt="country.name.official" class="w-8 h-6" />
            </TableCell>
            <TableCell
              class="border p-2 text-blue-600 cursor-pointer"
              @click="countryStore.selectCountry(country)"
            >
              {{ country.name.official }}
            </TableCell>

            <TableCell class="border">
              {{ country.cca2 }}
            </TableCell>

            <TableCell>{{ country.cca3 }}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <div class="flex items-center justify-end space-x-2 py-4">
      <div class="flex-1 text-sm text-muted-foreground">
        <span>Page {{ countryStore.currentPage }} / {{ countryStore.totalPages }}</span>
      </div>
      <div class="space-x-2">
        <Button
          variant="outline"
          size="sm"
          :disabled="countryStore.currentPage === 1"
          @click="countryStore.prevPage"
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          @click="countryStore.nextPage"
          :disabled="countryStore.currentPage === countryStore.totalPages"
        >
          Next
        </Button>
      </div>
    </div>

    <!-- Modal -->
    <CountryModal
      v-if="countryStore.selectedCountry"
      :country="countryStore.selectedCountry"
      @close="countryStore.selectedCountry = null"
    />
  </div>
</template>
