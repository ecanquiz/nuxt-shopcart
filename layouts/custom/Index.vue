<script setup lang="ts">
import TheFooter from '@/layouts/components/TheFooter.vue'
import Navbar from './Navbar.vue'

</script>

<template>      
  <div class="mx-auto mt-4 max-w-7xl space-y-4 px-4 xs:px-8 sm:px-10 lg:px-16 pb-16 w-3/5">
    <Navbar />
    <slot />
    <TheFooter />
  </div>
</template>
