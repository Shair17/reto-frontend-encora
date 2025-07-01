<script setup lang="ts">
// core
import { RouterLink } from 'vue-router';

// components
import IconReddit from './icons/IconReddit.vue';
</script>

<template>
  <header
    class="w-full z-50 flex flex-col bg-white/50 backdrop-blur-lg sticky top-0 border-b border-neutral-100"
  >
    <section
      class="mx-auto flex gap-4 w-full flex-row relative flex-nowrap items-center justify-between max-w-7xl px-6 lg:px-8 py-4"
    >
      <div
        class="flex basis-0 flex-row flex-grow flex-nowrap justify-start bg-transparent items-center no-underline text-medium whitespace-nowrap box-border"
      >
        <RouterLink to="/" class="flex items-center gap-1">
          <IconReddit class="text-reddit" />
          <p class="font-bold text-lg">Reddit Client</p>
        </RouterLink>
      </div>
    </section>
  </header>
</template>
