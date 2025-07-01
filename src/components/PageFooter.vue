<script setup lang="ts">
// core
import { computed } from 'vue';

// components
import IconReddit from './icons/IconReddit.vue';

const currentYear = computed(() => new Date().getFullYear().toString());
</script>

<template>
  <footer class="mt-auto flex w-full flex-col border-t border-neutral-100 bg-white">
    <section
      class="mx-auto w-full max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8"
    >
      <section class="space-y-px">
        <div class="flex items-center justify-center gap-3 md:justify-start">
          <div class="flex items-center gap-1">
            <IconReddit class="text-reddit" />

            <span class="text-lg font-medium">Reddit Client</span>
          </div>
        </div>
        <p class="text-center text-sm text-neutral-500 md:text-start">© {{ currentYear }} Shair</p>
      </section>

      <section class="flex flex-col items-center justify-center gap-2 md:items-end mt-4 md:mt-0">
        <p class="text-center text-sm text-neutral-500 md:text-start">
          Hecho por
          <a href="https://shair.dev" target="_blank" class="text-blue-500 underline">Shair</a> con
          mucho ❤️ y ☕
        </p>
      </section>
    </section>
  </footer>
</template>
