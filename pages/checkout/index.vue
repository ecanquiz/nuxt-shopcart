<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-6">Checkout</h1>
    <PayForm @confirm="onConfirm"/>
  </div>
</template>

<script lang="ts" setup>
import PayForm from './components/checkout/PayForm.vue'

function onConfirm() {
  console.log('Confirmando pedido...')
  void navigateTo('/')
}
</script>

<style scoped>
</style>