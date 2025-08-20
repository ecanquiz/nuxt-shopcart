<template>
  <UCard class="max-w-2xl items-center justify-center mx-auto p-6 space-y-6">
    <template #header>
      <h2 class="text-xl font-bold">Formulario de Pago</h2>
    </template>

    <!-- Step 1: Datos Cliente -->
    <CustomerForm v-if="step === 1" v-model="customer" @next="onNext" class="mx-auto" />

    <!-- Step 2: Dirección -->
    <AddressForm
      v-if="step === 2"
      v-model="address"
      @next="onNext"
      @back="onBack"
      class="mx-auto"
    />

    <!-- Step 3: Pago -->
    <UForm
      v-if="step === 3"
      :schema="paymentSchema"
      :state="pState"
      @submit.prevent="submitPayment"
      class="space-y-4 mx-auto"
    >
      <UFormField label="Método de Pago" name="paymentMethod">
        <div class="space-y-2">
          <UCheckbox id="card" v-model="isCard" value="card" label="Tarjeta de Crédito/Débito" />
          <UCheckbox id="paypal" v-model="isPaypal" value="paypal" label="PayPal" />
          <UCheckbox id="bank" v-model="isBank" value="bank" label="Transferencia" />
        </div>
      </UFormField>

      <!-- Datos de tarjeta solo si eligió "card" -->
      <div v-if="pState.paymentMethod === 'card'" class="space-y-3">
        <UFormField label="Número de tarjeta" name="cardNumber">
          <UInput placeholder="**** **** **** 4242" v-model="pState.cardNumber" class="w-full" />
        </UFormField>

        <UFormField label="Expiración" name="expiry">
          <UInput placeholder="MM/YY" v-model="pState.expiry" class="w-full" />
        </UFormField>

        <UFormField label="CVC" name="cvc">
          <UInput type="password" v-model="pState.cvc" class="w-full" />
        </UFormField>
      </div>

      <div v-if="errors.length" class="space-y-1">
        <UAlert
          v-for="(err, idx) in errors"
          :key="idx"
          color="error"
          :title="err"
        />
      </div>

      <div class="flex justify-between">
        <UButton color="neutral" @click="onBack">Atrás</UButton>
        <UButton type="submit" color="primary">Pagar</UButton>
      </div>
    </UForm>

    <!-- Step 4: Resumen y confirmación -->
    <OrderSummary
      v-if="step === 4"
      :customer="customer"
      :address="address"
      :paymentMethod="pState.paymentMethod as 'card' | 'paypal' | 'bank'"
      @back="onBack"
      @confirm="onConfirm"
    />
  </UCard>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CustomerForm from './CustomerForm.vue'
import AddressForm from './AddressForm.vue'
import OrderSummary from './OrderSummary.vue'
import { paymentSchema, paymentState as pState, isCard, isPaypal, isBank } from '../../composables/useCheckoutForm'


const step = ref(1)

// Datos cliente
const customer = ref({
  name: '',
  email: '',
  phone: ''
})

// Dirección
const address = ref({
  street: '',
  city: '',
  zip: ''
})

// Método de pago y tarjeta provienen del composable: pState

// Validación simple
const errors = ref<string[]>([])

const submitPayment = async () => {
  errors.value = []

  if (!customer.value.name || !customer.value.email) {
    errors.value.push('Nombre y correo son obligatorios')
    return
  }

  if (pState.paymentMethod === 'card' && !pState.cardNumber) {
    errors.value.push('Debes ingresar los datos de la tarjeta')
    return
  }

  // 👉 Aquí se enviaría a tu API o a un proveedor (Stripe, PayPal, etc.)
  console.log('Procesando pago...', {
    customer: customer.value,
    address: address.value,
    paymentMethod: pState.paymentMethod,
    card: {
      number: pState.cardNumber,
      expiry: pState.expiry,
      cvc: pState.cvc
    }
  })
  // Avanza al resumen
  step.value = 4
}

async function onConfirm() {
  // Aquí puedes llamar a tu API para crear la orden/pago definitivo
  console.log('Confirmando pedido...')
  await navigateTo('/')
}

const onBack = () => {
  step.value--
}
const onNext = () => {
  step.value++
}
</script>
