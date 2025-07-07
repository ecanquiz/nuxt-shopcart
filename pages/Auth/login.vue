<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
    <UCard class="w-full max-w-md">
      <template #header>
        <div class="text-center">
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
            Welcome back
          </h1>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Sign in to your account to continue
          </p>
        </div>
      </template>

      <!-- Error Alert -->
      <UAlert
        v-if="errorMessage"
        color="error"
        variant="subtle"
        icon="i-heroicons-exclamation-circle"
        :title="errorMessage"
        class="mb-4"
      />

      <!-- Google Sign In Button -->
      <UButton
        block
        size="lg"
        color="primary"
        :loading="isLoading"
        :disabled="isLoading"
        @click="signInWithGoogle"
        class="justify-center mb-4"
      >
        <template #leading>
          <UIcon name="i-logos-google-icon" class="w-5 h-5" />
        </template>
        Continue with Google
      </UButton>

      <div class="relative my-6">
        <div class="absolute inset-0 flex items-center">
          <span class="w-full border-t border-gray-200 dark:border-gray-700" />
        </div>
        <div class="relative flex justify-center text-sm">
          <span class="px-2 bg-white dark:bg-gray-900 text-gray-500">
            Or continue with email
          </span>
        </div>
      </div>

      <!-- Email Form -->
      <UForm :state="form" class="space-y-4 gap-3 items-center justify-center" @submit="onSubmit">
        <UFormField label="Email" name="email">
          <UInput 
            v-model="form.email" 
            type="email" 
            placeholder="you@example.com"
            icon="i-heroicons-envelope"
            required
            class="w-full mx-auto"
          />
        </UFormField>

        <UFormField label="Password" name="password">
          <UInput 
              v-model="form.password" 
              :type="showPassword ? 'text' : 'password'" 
              placeholder="••••••••"
              icon="i-heroicons-lock-closed"
              required
              class="w-full mx-auto mt-2"
            >
            <template #trailing>
              <UButton
              color="primary"
              variant="ghost"
              :icon="showPassword ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'"
              @click="showPassword = !showPassword"
            />
            </template>
            </UInput>           
        </UFormField>

        <div class="flex items-center justify-between text-sm mt-2">
          <label class="flex items-center">
            <UCheckbox v-model="form.remember" />
            <span class="ml-2 text-gray-700 dark:text-gray-300">Remember me</span>
          </label>
          <NuxtLink 
            to="#" 
            class="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
          >
            Forgot password?
          </NuxtLink>
        </div>

        <UButton
          type="submit"
          block
          :loading="isSubmitting"
          :disabled="isSubmitting"
          class="mt-6"
        >
          Sign in
        </UButton>
      </UForm>

      <template #footer>
        <div class="text-center text-sm text-gray-500 dark:text-gray-400">
          Don't have an account? 
          <NuxtLink 
            to="#" 
            class="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
          >
            Sign up
          </NuxtLink>
        </div>
      </template>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from '@/pages/Auth/composables/useAuth'

const route = useRoute()
const router = useRouter()

const { signIn, isLoading, isSubmitting, showPassword, errorMessage } = useAuth()

// Form state
const form = reactive({
  email: '',
  password: '',
  remember: false
})


// Handle OAuth errors
onMounted(() => {
  if (route.query.error) {
    switch (route.query.error) {
      case 'access_denied':
        errorMessage.value = 'Access was denied. Please try again.'
        break
      case 'oauth_callback_error':
        errorMessage.value = 'There was an error during authentication. Please try again.'
        break
      default:
        errorMessage.value = 'An error occurred during sign in. Please try again.'
    }
    
    // Clear the error from the URL
    const query = { ...route.query }
    delete query.error
    router.replace({ query })
  }
})

// Form submission
const onSubmit = async () => {
  isSubmitting.value = true
  errorMessage.value = ''
  
  try {
    // TODO: Implement email/password authentication
    console.log('Form submitted:', form)
    // await signInWithEmail(form.email, form.password)
    // navigateTo('/dashboard')
  } catch (error) {
    errorMessage.value = (error as Error).message || 'Failed to sign in. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}

// Google OAuth sign in
const signInWithGoogle = async () => {
   
 await  signIn('google')
}
</script>
