<template>
  <UForm :schema="addressSchema" :state="state" @submit.prevent="onNext" class="space-y-4">
    <UFormField label="Calle" name="street">
      <UInput v-model="state.street" class="w-full"/>
    </UFormField>
    <UFormField label="Ciudad" name="city">
      <UInput v-model="state.city" class="w-full"/>
    </UFormField>
    <UFormField label="Código Postal" name="zip">
      <UInput v-model="state.zip" class="w-full"/>
    </UFormField>

    <div class="flex justify-between">
      <UButton color="neutral" @click="onBack">Atrás</UButton>
      <UButton type="submit">Siguiente</UButton>
    </div>
  </UForm>
    
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'
import { addressSchema, addressState as state } from '../../composables/useCheckoutForm'

interface Address { street: string; city: string; zip: string }

const props = defineProps<{ modelValue: Address }>()
const emit = defineEmits<{
  (e: 'update:modelValue', v: Address): void
  (e: 'next'): void
  (e: 'back'): void
}>()

const local = reactive<Address>({ ...props.modelValue })

// Sync hacia el padre usando el composable como fuente de verdad
watch(state, (val) => emit('update:modelValue', { ...(val as Address) }), { deep: true })

const onNext = () => emit('next')
const onBack = () => emit('back')
</script>

<style scoped></style>
