<template>
  <div>
    <!-- Only show content if user is authenticated -->
    <slot v-if="isAuthenticated" />

    <!-- Show loading state while checking auth -->
    <div v-else-if="isLoading" class="flex justify-center p-8">
      <UButton loading>Loading...</UButton>
    </div>

    <!-- Show sign in prompt if not authenticated -->
    <div v-else class="flex flex-col items-center justify-center p-8 space-y-4">
      <UIcon name="i-heroicons-lock-closed" class="w-12 h-12 text-gray-400" />
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
        Authentication Required
      </h2>
      <p class="text-gray-500 dark:text-gray-400 text-center">
        You need to be signed in to access this page.
      </p>
      <UButton
        to="/auth/login"
        color="primary"
        class="mt-4"
        @click="redirectToLogin"
      >
        Sign In
      </UButton>
    </div>

    <!-- User menu (floating) -->
    <div v-if="isAuthenticated" class="fixed bottom-4 right-4">
      <UDropdownMenu :items="userMenuItems" :ui="{ content: 'w-48' }">
        <UButton 
          color="primary" 
          variant="ghost"
          class="flex items-center gap-2 shadow-lg"
        >
          <UAvatar
            v-if="user?.image"
            :src="user.image"
            :alt="user.name || 'User'"
            size="sm"
          />
          <span class="hidden sm:inline text-sm font-medium text-gray-700 dark:text-gray-200">
            {{ user?.name || user?.email?.split('@')[0] || 'User' }}
          </span>
          <UIcon name="i-heroicons-chevron-down" class="w-4 h-4 text-gray-500" />
        </UButton>
        
        <template #item="{ item }">
          <span class="truncate">{{ item.label }}</span>
          <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto" />
        </template>
      </UDropdownMenu>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

const route = useRoute()
const session = useUserSession()
const toast = useToast()

// State
const isLoading = ref(true)
const user = computed(() => session.user.value || null)
const isAuthenticated = computed(() => !!user.value)

// Redirect to login with return URL
const redirectToLogin = () => {
  const returnTo = route.path !== '/auth/login' ? route.fullPath : undefined
  navigateTo(`/auth/login${returnTo ? `?redirect=${encodeURIComponent(returnTo)}` : ''}`)
}

// Sign out handler
const signOut = async () => {
  try {
    await $fetch('/api/auth/logout', { method: 'POST' })
    await session.clear()
    await navigateTo('/auth/login')
  } catch (error) {
    toast.add({
      title: 'Error',
      description: 'Failed to sign out. Please try again.',
      color: 'error'
    })
  }
}

// User menu items
const userMenuItems = [
  [{
    label: 'Your Profile',
    icon: 'i-heroicons-user-circle',
    click: () => navigateTo('/')
  }],
  [{
    label: 'Sign out',
    icon: 'i-heroicons-arrow-left-on-rectangle',
    click: signOut
  }] satisfies DropdownMenuItem[]
]

// Check auth status on component mount
onMounted(async () => {
  try {
    // If no session, try to refresh it
    if (!session.user.value) {
      await session.fetch()
    }
  } catch (error) {
    console.error('Auth check failed:', error)
  } finally {
    isLoading.value = false
  }
})

// Watch for auth changes
watch(() => session.user.value, (newUser) => {
  if (!newUser && route.meta.requiresAuth) {
    redirectToLogin()
  }
}, { immediate: true })
</script>