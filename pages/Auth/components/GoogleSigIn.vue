<script lang="ts" setup>
import { useAuth } from '../composables/useAuth'

const { signIn, isLoading } = useAuth()
// Google OAuth sign in
const signInWithGoogle = async () => {   
   await  signIn('google')
  }
</script>

<template>
  <UButton
        block
        size="lg"
        color="primary"
        :loading="isLoading"
        :disabled="isLoading"
        @click="signInWithGoogle"
        class="justify-center mb-4 cursor-pointer"
      >
        <template #leading>
          <UIcon name="i-logos-google-icon" class="w-5 h-5" />
        </template>
        Continue with Google
      </UButton>
</template>
    
