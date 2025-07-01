<script setup lang="ts">
// core
import { ref, onMounted, onUnmounted } from 'vue';

// components
import IconArrowUp from './icons/IconArrowUp.vue';

const visible = ref<boolean>(false);

function onScroll() {
  visible.value = window.scrollY > 200;
}

onMounted(() => {
  window.addEventListener('scroll', onScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll);
});
</script>

<template>
  <transition name="fade-slide">
    <a
      v-if="visible"
      href="#app"
      class="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-reddit text-white shadow-lg hover:bg-reddit/80 transition-all"
    >
      <IconArrowUp />
    </a>
  </transition>
</template>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
