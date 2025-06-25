<script setup>
import CountInput from "./CountInput.vue";

defineProps({
  product: { type: Object, required: true },
  count: { type: Number, required: true },
});

defineEmits(["updateCount", "clear"]);
</script>
<template>
  <li class="flex justify-between p-2 odd:bg-gray-300 even:bg-gray-200">
    <span>{{ product.name }}</span>
    <span class="whitespace-nowrap">
      <CountInput :model-value="count" @update:modelValue="$emit('updateCount', $event)" />
      <span class="inline-block w-12 text-right">${{ count * product.price }}</span>
      <span class="ml-4" @click="$emit('clear')">
        <fa icon="trash-alt" />
      </span>
    </span>
  </li>
</template>
