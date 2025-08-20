<template>
  <div class="space-y-6">
    <UCard>
      <template #header>
        <div class="font-semibold">Resumen del pedido</div>
      </template>

      <div v-if="isEmpty" class="py-4">
        <UAlert color="info" title="Tu carrito está vacío" />
      </div>

      <div v-else class="space-y-3">
        <div
          v-for="(item, idx) in items"
          :key="idx"
          class="flex items-center justify-between gap-4 border-b border-gray-200 pb-3 last:border-0"
        >
          <div class="flex items-center gap-3">
            <img
              :src="item.image || placeholder"
              alt="item"
              class="w-12 h-12 object-cover rounded"
            />
            <div>
              <div class="font-medium">{{ item.name }}</div>
              <div class="text-sm text-gray-500">$ {{ item.price.toFixed(2) }}</div>
            </div>
          </div>
          <!-- Asumimos 1 unidad por item en el store -->
          <div class="text-right">
            <div class="text-sm">Cantidad: 1</div>
          </div>
        </div>

        <div class="flex justify-between pt-2">
          <span class="font-medium">Subtotal</span>
          <span>$ {{ total.toFixed(2) }}</span>
        </div>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <div class="font-semibold">Datos</div>
      </template>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div class="text-sm text-gray-500">Cliente</div>
          <div class="font-medium">{{ customer.name || '-' }}</div>
          <div class="text-sm">{{ customer.email || '-' }}</div>
          <div class="text-sm">{{ customer.phone || '-' }}</div>
        </div>
        <div>
          <div class="text-sm text-gray-500">Dirección</div>
          <div>{{ address.street || '-' }}</div>
          <div>{{ address.city || '-' }} {{ address.zip || '' }}</div>
        </div>
      </div>
      <div class="mt-4">
        <div class="text-sm text-gray-500">Pago</div>
        <div class="capitalize">{{ paymentMethodLabel }}</div>
      </div>
    </UCard>

    <div class="flex justify-between">
      <UButton color="neutral" @click="onBack">Atrás</UButton>
      <UButton color="primary" @click="onConfirm" :disabled="isEmpty">Confirmar pedido</UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCartStore } from '~/stores/CartStore'

interface Customer { name: string; email: string; phone: string }
interface Address { street: string; city: string; zip: string }

type Payment = 'card' | 'paypal' | 'bank'

const props = defineProps<{
  customer: Customer
  address: Address
  paymentMethod: Payment
}>()

const emit = defineEmits<{ (e: 'back'): void; (e: 'confirm'): void }>()

const store = useCartStore()
const items = computed(() => store.items)
const total = computed(() => store.total)
const isEmpty = computed(() => store.isEmpty)

const placeholder = '/images/double-bubble-outline.png'

const paymentMethodLabel = computed(() => {
  switch (props.paymentMethod) {
    case 'paypal':
      return 'PayPal'
    case 'bank':
      return 'Transferencia'
    default:
      return 'Tarjeta'
  }
})

function onBack() {
  emit('back')
}

function onConfirm() {
  // Aquí podrías llamar a un endpoint para crear la orden
  // Por ahora solo emitimos el evento
  emit('confirm')
}
</script>

<style scoped></style>
