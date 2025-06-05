<script setup lang="ts">
const useColorModePicker = () => {
  const colorMode = useColorMode()

  const items = ref([{ 
    label: 'System',
    id: 'system'
  }, {
    label: 'Light',
    id: 'light'
  }, {
    label: 'Dark',
    id: 'dark'
  }, {
    label: 'Sepia',
    id: 'sepia'
  }])

  const value = ref(colorMode.preference)

  const changeValue = () => colorMode.preference = value.value

  return { items , value, changeValue }  
}

const { items , value, changeValue } = useColorModePicker()
</script>

<template>
  <ClientOnly>
    <div>
      <USelect
        class="w-36"
        variant="subtle"
        value-key="id"
        size="xl"
        v-model="value"
        :items="items"
        @change="changeValue"
      />
    </div>
  </ClientOnly>
</template>
