<script setup>
import { useProductStore } from "@/stores/ProductStore";
import { useCartStore } from "@/stores/CartStore";
import AppButton from "@/components/app/Button.vue";
import AppColorModePicker from "@/components/app/ColorModePicker.vue";
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
  <div class="container mx-auto p-10">
    <div class="mb-5 flex justify-end">
      <AppButton @click="cartStore.undo">Undo</AppButton>
      <AppButton class="ml-2" @click="cartStore.redo">Redo</AppButton>
    </div>
    <h1 class="text-4xl font-bold text-primary-800 mb-8 animate-bounce-slow">Colección Destacada</h1>
    <ClientOnly>
      <!--ul class="sm:flex flex-wrap lg:flex-nowrap gap-5"-->
      <ul class="sm:flex flex-wrap gap-5">
        <ProductCard
          v-for="product in productStore.products"
          :key="product.name"
          :product="product"
          @addToCart="cartStore.addItems($event, product)"
        />
      </ul>
    </ClientOnly>
    <div>   
      <br />
      <!--ClientOnly-->
      <AppColorModePicker />
      <!--/ClientOnly-->
    </div>
  </div>
  <!-- Refactor /-->  
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