<script>
import { useAuthUserStore } from "@/stores/AuthUserStore";
import { mapState, mapActions } from "pinia";
import CartWidget from "./CartWidget.vue";
export default {
  components: { CartWidget },
  computed: {
    ...mapState(useAuthUserStore, {
      user: "username",
    }),
  },
  methods: {
    ...mapActions(useAuthUserStore, {
      toTwitter: "visitTwitterProfile",
    }),
  },
};
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
                  
          <button
            onclick="toggleDarkMode()" 
            class="p-2 rounded-lg bg-primary-500 text-white hover:bg-primary-600 transition-colors group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 group-hover:rotate-180 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </button>                    
        </div>

        <div>
          <span class="mr-5" @click="toTwitter">{{ user }}</span>
            <CartWidget class="inline-block" />
        </div>

      </div>
    </div>
  </header>
</template>