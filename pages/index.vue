<script setup>
import { useProductStore } from "@/stores/ProductStore";
import { useCartStore } from "@/stores/CartStore";
import AppButton from "@/components/app/Button.vue";
import ProductCard from "@/components/shopcart/ProductCard.vue";

definePageMeta({
   layout: 'default',
  // colorMode: 'light',
})

const productStore = useProductStore();
const cartStore = useCartStore();

cartStore.$onAction(({ name, store, args, after, onError }) => {
  if (name === "addItems") {
    after(() => {
      console.log(args[0]);
    });
    onError((error) => {
      console.log("Hello error: ", error.message);
    });
  }
});

productStore.fill();
const colorMode = useColorMode()
//console.log(colorMode.preference)
</script>

<template>
  <UApp>
    <div class="container mx-auto p-10">
      <div class="mb-5 flex justify-end">
        <AppButton @click="cartStore.undo">Undo</AppButton>
        <AppButton class="ml-2" @click="cartStore.redo">Redo</AppButton>
      </div>
      <h1 class="text-4xl font-bold text-primary-600 mb-8 animate-bounce-slow">Colección Destacada</h1>
      <ul class="sm:flex flex-wrap gap-5">
        <ClientOnly fallbackTag="span">
          <ProductCard
          v-for="product in productStore.products"
          :key="product.name"
          :product="product"
          @addToCart="cartStore.addItems($event, product)"
          />
          <template #fallback>
            <p>Loading products...</p>
          </template>
        </ClientOnly>
        
      </ul>
    <div>
  </div>
  </div>
  <!-- Refactor /--> 
  </UApp> 
</template>

<style>
body {
  background-color: #fff;
  color: rgba(0,0,0,0.8);
}
.dark-mode body {
  background-color: #091a28;
  color: #ebf4f1;
}
.sepia-mode body {
  background-color: #f1e7d0;
  color: #433422;
}
</style>