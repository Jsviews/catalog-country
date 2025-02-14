<script setup lang="ts">
import type { Country } from '@/stores/countryStore'
import Button from './ui/button/Button.vue'

interface Props {
  country: Country
}

const props = defineProps<Props>()

defineEmits(['close'])
</script>

<template>
  <div class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
    <div class="bg-white p-5 rounded-lg w-96">
      <h2 class="text-xl font-bold mb-2">{{ props.country.name.official }}</h2>
      <p>
        <strong>Native Name:</strong>
        {{ Object.values(props.country.name.nativeName as any)[0]?.common || 'N/A' }}
      </p>
      <p><strong>Alternative Names:</strong> {{ country.altSpellings.join(', ') }}</p>
      <p>
        <strong>Calling Code:</strong> {{ country.idd?.root
        }}{{ country.idd?.suffixes?.join(', ') || '' }}
      </p>
      <Button variant="destructive" @click="$emit('close')" class="mt-4 p-2 rounded">Close</Button>
    </div>
  </div>
</template>
