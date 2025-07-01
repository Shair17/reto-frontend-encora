<script setup lang="ts">
import { RouterView } from 'vue-router';
import { Toaster } from 'vue-sonner';
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';
</script>

<template>
  <!-- View -->
  <RouterView />

  <!-- Sonner Toast -->
  <Toaster position="bottom-right" richColors />

  <!-- VueQuery Devtools -->
  <VueQueryDevtools button-position="bottom-left" />
</template>
