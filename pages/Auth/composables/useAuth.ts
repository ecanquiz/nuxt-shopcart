import { useAuthUserStore } from '@/stores/AuthUserStore'

// UI state
const isLoading = ref(false)
const isSubmitting = ref(false)
const showPassword = ref(false)
const errorMessage = ref('')

export const useAuth = () => {
  const storeAuth = useAuthUserStore()
  const session = useUserSession()

  const user = computed(() => session.user || null)
  const username = computed(() => session.user?.value?.name || null)
  
  // Update the store when the session changes
  watchEffect(() => {
    if (session.user.value) {
      storeAuth.setUsername(session.user.value.name || null)
    } else {
      storeAuth.setUsername('')
    }
  })
  
  
  const signIn = async (provider: string) => {
    isSubmitting.value = true
    await signInWithProvider(provider)
    isSubmitting.value = false
  }

  const signOut = async () => {
    await session.clear()
    storeAuth.setUsername('')
    $fetch('/api/auth/logout')
    console.log('User signed out')
  }

  const getProfile = async () => {
    const profile = await $fetch('/api/auth/profile')
    return profile
  }

 const visitTwitterProfile = () => {
    storeAuth.visitTwitterProfile()
  }
  return {
    user,
    username,
    signIn,
    signOut,
    getProfile,
    visitTwitterProfile,
    isLoading,
    isAuthenticated: computed(() => session.loggedIn.value),
    isSubmitting,
    showPassword,
    errorMessage
  }
}


const signInWithProvider = async (provider: string) => {
  isLoading.value = true
  errorMessage.value = ''
  try {
    switch (provider) {
      case 'google':
        await signInWithGoogle()
        break
      default:
        throw new Error('Invalid provider')
    }
  } catch (error) {
    errorMessage.value = (error as Error).message || 'Failed to sign in. Please try again.'
  } finally {
    isLoading.value = false
  }
}

const signInWithGoogle = async () => {
  isLoading.value = true
  errorMessage.value = ''
  try {
    // Redirect to Google OAuth endpoint
    window.location.href = '/api/auth/google'
    // $fetch('/api/auth/google', {
    //   method: 'GET'
    // })
    console.log('Redirecting to Google OAuth endpoint')
  } catch (error) {
    errorMessage.value = (error as Error).message || 'Failed to sign in. Please try again.'
  } finally {
    isLoading.value = false
  }
}
  