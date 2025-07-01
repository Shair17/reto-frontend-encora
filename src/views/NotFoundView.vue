<script lang="ts" setup>
import IconReddit from '@/components/icons/IconReddit.vue';
</script>

<template>
  <section
    class="relative z-10 flex flex-1 flex-col px-4 py-44 sm:py-20 sm:justify-center md:flex-none md:px-28"
  >
    <div class="mx-auto w-full max-w-md sm:px-4 md:w-96 md:max-w-sm md:px-0">
      <div class="flex">
        <a aria-label="Home" href="/" class="flex items-center gap-1">
          <IconReddit class="text-reddit" />
          <p class="font-bold text-lg">Reddit Client</p>
        </a>
      </div>

      <p class="mt-10 text-sm font-medium text-gray-700">404</p>

      <h1 class="mt-3 text-lg font-semibold text-gray-900">Página no encontrada</h1>

      <p class="mt-3 text-sm text-gray-700">
        Lo siento, no pudimos encontrar la página que estás buscando.
      </p>

      <a
        class="group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 bg-reddit text-white hover:bg-reddit/80 hover:text-white active:bg-reddit active:text-white focus-visible:outline-reddit mt-10"
        href="/"
        >Ir al inicio</a
      >
    </div>
  </section>
</template>
