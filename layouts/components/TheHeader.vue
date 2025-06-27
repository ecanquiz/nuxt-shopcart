<script setup lang="ts">
import { ref, computed } from "vue"
import { useAuthUserStore } from "@/stores/AuthUserStore";
import AppColorModePicker from "@/components/app/ColorModePicker.vue";
import CartWidget from "@/components/shopcart/CartWidget.vue";

const authUserStore = useAuthUserStore();
const user = computed(() => authUserStore.username);
const toTwitter = () => authUserStore.visitTwitterProfile();

const mobileMenuOpen = ref(false);
</script>

<template>
  <header class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-lg sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16 items-center">
        <!-- Logo y menú hamburguesa -->
        <div class="flex items-center space-x-4">
          <NuxtLink to="/">
            <span class="text-2xl font-bold text-primary-600">Bodega.com</span>
          </NuxtLink>
          <button class="lg:hidden ml-2 p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary-400"
            @click="mobileMenuOpen = !mobileMenuOpen" aria-label="Abrir menú">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"
              stroke-linecap="round" stroke-linejoin="round">
              <path v-if="!mobileMenuOpen" d="M4 6h16M4 12h16M4 18h16" />
              <path v-else d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div class="hidden lg:flex items-center space-x-4">
            <NuxtLink to="/tests">
              <span class="text-2xl font-bold text-primary-600">Test.com</span>
            </NuxtLink>
          </div>
        </div>

        <!-- Buscador (oculto en móviles) -->
        <div class="hidden md:flex items-center space-x-4 flex-1 justify-center">
          <input type="text" placeholder="Search products..."
            class="w-64 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-400 transition-all" />
        </div>

        <!-- Usuario y carrito -->
        <div class="flex items-center">
          <span class="mr-5 cursor-pointer hidden sm:inline" @click="toTwitter">{{ user }}</span>
          <ClientOnly>
            <CartWidget class="inline-block" />
          </ClientOnly>
          <AppColorModePicker class="ml-4" />
        </div>
      </div>

      <!-- Menú móvil -->
      <transition name="fade">
        <div v-if="mobileMenuOpen"
          class="lg:hidden mt-2 bg-white dark:bg-gray-800 rounded shadow-md p-4 flex flex-col space-y-4">
          <NuxtLink to="/tests" class="text-lg font-semibold text-primary-600" @click="mobileMenuOpen = false">
            Test.com
          </NuxtLink>
          <input type="text" placeholder="Search products..."
            class="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-400 transition-all" />
          <span class="cursor-pointer" @click="toTwitter">{{ user }}</span>
        </div>
      </transition>
    </div>
  </header>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>