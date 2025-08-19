<template>
  <UForm :schema="customerSchema" :state="state" @submit.prevent="onNext" class="space-y-4 mx-auto">
    <UFormField label="Nombre" name="name">
      <UInput v-model="state.name" class="w-full"/>
    </UFormField>
    <UFormField label="Email" name="email">
      <UInput type="email" v-model="state.email" class="w-full"/>
    </UFormField>
    <UFormField label="Teléfono" name="phone">
      <UInput type="tel" v-model="state.phone" class="w-full"/>
    </UFormField>
    <div class="flex justify-end">
      <UButton type="submit">Siguiente</UButton>
    </div>
  </UForm>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'
import { customerSchema, customerState as state } from '../../composables/useCheckoutForm'

interface Customer {
  name: string
  email: string
  phone: string
}

const props = defineProps<{ modelValue: Customer }>()
const emit = defineEmits<{
  (e: 'update:modelValue', v: Customer): void
  (e: 'next'): void
}>()

const local = reactive<Customer>({ ...props.modelValue })

// Mantener sincronización con el padre usando el composable como fuente de verdad
watch(state, (val) => emit('update:modelValue', { ...(val as Customer) }), { deep: true })

const onNext = () => emit('next')
</script>

<style scoped></style>
