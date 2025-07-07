<script setup lang="ts">
import { ref, computed } from 'vue'
import AppColorModePicker from '@/components/app/ColorModePicker.vue'
import CartWidget from '@/components/shopcart/CartWidget.vue'
import { useAuth } from '~/pages/Auth/composables/useAuth'


defineOptions({
  name: 'TheHeader'
})

const authUserStore = useAuth()

const mobileMenuOpen = ref(false)

// Create dropdown items based on authentication state
const dropdownItems = computed(() => {
  const items = [
    [{
      label: authUserStore.username.value || 'Guest User',
      slot: 'account',
      disabled: true
    }],
    [
      {
        label: 'Settings',
        icon: 'i-heroicons-cog-6-tooth',
        to: '#'
      },
      {
        label: 'Billing',
        icon: 'i-heroicons-credit-card',
        to: '#'
      }
    ],
    authUserStore.isAuthenticated.value
      ? [
          {
            label: 'Sign out',
            icon: 'i-heroicons-arrow-right-on-rectangle',
            onSelect: () => authUserStore.signOut()
          }
        ]
      : [
          {
            label: 'Sign in',
            icon: 'i-heroicons-arrow-left-on-rectangle',
            onSelect: () => authUserStore.signIn('google')
          }
        ]
  ]
  
  return items
})

</script>

<template>
  <header class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-lg sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16 items-center">
        <!-- Logo y menú hamburguesa -->
        <div class="flex items-center space-x-4">
          <NuxtLink to="/">
            <span class="text-2xl font-bold text-primary-600">Bodega.com </span>
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

        <!-- User and cart -->
        <div class="flex items-center gap-2">
          <ClientOnly>
            <CartWidget class="inline-block" />
          </ClientOnly>
          
          <AppColorModePicker class="ml-2" />
          
          <UDropdownMenu :items="dropdownItems" :ui="{ content: 'w-48' }">
            <UButton
              color="primary"
              variant="ghost"
              :label="authUserStore.username.value || 'Account'"
              trailing-icon="i-heroicons-chevron-down-20-solid"
              class="ml-2"
            />
            
            <template #account>
              <div class="text-left">
                <p class="truncate text-sm font-medium text-gray-900 dark:text-white">
                  {{ authUserStore.username.value || 'Guest User' }}
                </p>
                <p class="truncate text-xs text-gray-500 dark:text-gray-400">
                  {{ authUserStore.username.value ? 'View profile' : 'Sign in to your account' }}
                </p>
              </div>
            </template>
          </UDropdownMenu>
        </div>
      </div>

      <!-- Menú móvil -->
      <transition name="fade">
        <div v-if="mobileMenuOpen" class="lg:hidden mt-2 bg-white dark:bg-gray-800 rounded shadow-md p-4 flex flex-col space-y-4">
          <NuxtLink to="/tests" class="text-lg font-semibold text-primary-600" @click="mobileMenuOpen = false">
            Test.com
          </NuxtLink>
          <input type="text" placeholder="Search products..."
            class="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-400 transition-all" />
          
          <!-- Mobile User Dropdown -->
          <UDropdownMenu :items="dropdownItems">
            <UButton
              color="primary"
              variant="ghost"
              :label="authUserStore.username.value || 'Account'"
              icon="i-lucide-user"
              class="w-full justify-start"
            />
            
            <template #account>
              <div class="text-left w-full">
                <p class="truncate text-sm font-medium text-gray-900 dark:text-white">
                  {{ authUserStore.username.value || 'Guest User' }}
                </p>
                <p class="truncate text-xs text-gray-500 dark:text-gray-400">
                  {{ authUserStore.username.value ? 'View profile' : 'Sign in to your account' }}
                </p>
              </div>
            </template>
          </UDropdownMenu>
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