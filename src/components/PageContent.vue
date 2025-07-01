<template>
  <main id="view-transition" class="flex-grow bg-neutral-50">
    <slot />
  </main>
</template>

<style>
::view-transition-old(#view-transition),
::view-transition-new(#view-transition) {
  animation: fade-slide 300ms ease;
}

@keyframes fade-slide {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
