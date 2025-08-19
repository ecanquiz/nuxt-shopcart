<script setup>
// imports
import { ref } from "vue";
// import AppButton from "@/components/app/Button.vue";
import CountInput from "./CountInput.vue";

// props
const props = defineProps({
  product: Object,
});

// emits
defineEmits(["addToCart"])

// data
const count = ref(0);
</script>
<template>
  <li class="card my-2">
    <img :src="`${product.image}`" class="max-w-[400px] h-64 object-cover mb-3 rounded-2xl" width="400" />
    <div>
      <h2>{{ product.name }}</h2>
      <div class="flex justify-between my-4 max-w-[400px]">
        <span>Precio: <span class="text-green-500 mr-4">${{ product.price }}</span></span>
        <CountInput v-model="count" />
      </div>
      <UButton block @click="$emit('addToCart', count), (count = 0)">
        Add to Cart
      </UButton>
    </div>
  </li>
</template>


<style scoped lang="postcss">
.card {
  @apply max-w-[420px] shadow rounded-lg p-4 text-center text-lg font-normal text-gray-700 bg-white sm:w-1/3 lg:w-1/4 flex-grow border;
}

.card img {
  @apply mx-auto;
}
</style>
