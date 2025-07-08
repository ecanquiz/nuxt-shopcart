<script setup>
import AuthGuard from '~/components/AuthGuards.vue'
definePageMeta({
   layout: 'custom',
   middleware: 'auth'
})
</script>
<template>
    <AuthGuard>
    <!-- Protected content goes here -->
    <div class="p-4">
      <h1>Protected Dashboard</h1>
      <p>Only authenticated users can see this content.</p>
    </div>
  </AuthGuard>
</template>