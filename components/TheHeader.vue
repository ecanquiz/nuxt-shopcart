<script setup lang="ts">
import { computed } from "vue"
import { useAuthUserStore } from "@/stores/AuthUserStore";
import CartWidget from "./CartWidget.vue";

const authUserStore = useAuthUserStore();
const user = computed(() => authUserStore.username);
const toTwitter = () => authUserStore.visitTwitterProfile();
</script>

<template>
  <header class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-lg sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16 items-center">
        <div class="flex items-center space-x-4">
          <NuxtLink to="/">
            <span class="text-2xl font-bold text-primary-600">Bodega.com</span>                   
          </NuxtLink>
        </div>

        <div class="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search products..." 
            class="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-400 transition-all"
          />          
        </div>

        <div>
          <span class="mr-5" @click="toTwitter">{{ user }}</span>
            <CartWidget class="inline-block" />
        </div>

      </div>
    </div>
  </header>
</template>