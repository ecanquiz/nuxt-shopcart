import { defineStore } from 'pinia'
import { acceptHMRUpdate } from 'pinia'

export const useAuthUserStore = defineStore('AuthUserStore', () => {
  const username = ref<string | null>(null)
  
  const visitTwitterProfile = () => {
    if (username.value) {
      window.open(`https://twitter.com/${username.value}`, '_blank')
    }
  }

  const setUsername = (user: string | null) => {
    username.value = user
  }
  
  const isAuthenticated = computed(() => !!username.value)
  
  return {
    username,
    isAuthenticated,
    visitTwitterProfile,
    setUsername
  }
})

// Enable HMR for this store
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthUserStore, import.meta.hot))
}