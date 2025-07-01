<script setup lang="ts">
// core
import { RouterView, useRoute } from 'vue-router';
import { Toaster } from 'vue-sonner';
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';

// components
import PageContent from '@/components/PageContent.vue';
import PageFooter from '@/components/PageFooter.vue';
import PageHeader from '@/components/PageHeader.vue';
import ScrollToTop from '@/components/ScrollToTop.vue';

const route = useRoute();
</script>

<template>
  <!-- Page Header -->
  <PageHeader />

  <!-- Page Content -->
  <PageContent>
    <RouterView :key="route.fullPath" />
  </PageContent>

  <!-- Page Footer -->
  <PageFooter />

  <!-- Scroll To Top -->
  <ScrollToTop />

  <!-- Sonner Toast -->
  <Toaster position="bottom-right" richColors />

  <!-- VueQuery Devtools -->
  <VueQueryDevtools button-position="bottom-left" />
</template>
