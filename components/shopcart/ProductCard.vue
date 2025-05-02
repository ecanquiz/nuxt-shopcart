<script setup>
// imports
import { ref } from "vue";
import AppButton from "@/components/app/Button.vue";
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
  <li class="card">
    <img :src="`/images/${product.image}`" class="w-full h-64 object-cover mb-3 rounded-2xl" width="300" />
    <div>
     
      <div class="text-center mt-4">
        {{ product.name }} - <span class="text-green-500 mr-4">${{product.price}}</span>
        <CountInput v-model="count" />
      </div>
      <AppButton
        class="mt-4 w-full bg-primary-500 text-white py-2 px-4 rounded-lg hover:bg-primary-600 transition-colors"
        @click="$emit('addToCart', count), (count = 0)"
      >
        Add to Cart
      </AppButton>
    </div>
  </li>
</template>


<style scoped lang="postcss">
.card {
  @apply shadow rounded-lg p-4 text-center text-lg font-normal text-gray-700 bg-white sm:w-1/3 lg:w-1/4 flex-grow border;
}
.card img {
  @apply mx-auto;
}
</style>



