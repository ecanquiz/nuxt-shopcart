<script setup lang="ts">
import { useAuth } from '@/pages/Auth/composables/useAuth'

const { getProfile } = useAuth()
const session = useUserSession()

onMounted(async () => {
  if (session.user.value) {
      await getProfile()
    }else {
      console.log('No user session')
    }
})
</script>

<template>
  <!--https://tailwindflex.com/@abhirajk/shoping-products-->
  <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
</template>
