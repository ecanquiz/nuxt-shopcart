<script setup lang="ts">
import TheHeader from '@/layouts/components/TheHeader.vue'
import TheFooter from '@/layouts/components/TheFooter.vue'
import Navbar from './Navbar.vue'

</script>

<template>
  <div>
    <TheHeader />
    <slot />
    <!--TheFooter /-->
  </div>
</template>