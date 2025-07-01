<script setup lang="ts">
// core
import { ref, watchEffect, onBeforeUnmount } from 'vue';

// components
import IconReddit from './icons/IconReddit.vue';

const emit = defineEmits<{
  (e: 'load'): void;
}>();

const props = defineProps<{
  disabled?: boolean;
}>();

const trigger = ref<HTMLElement | null>(null);
let observer: IntersectionObserver | null = null;

watchEffect(() => {
  if (props.disabled || !trigger.value) return;

  if (observer) observer.disconnect();

  observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      emit('load');
    }
  });

  observer.observe(trigger.value);
});

onBeforeUnmount(() => {
  if (observer) observer.disconnect();
});
</script>

<template>
  <div ref="trigger" class="flex justify-center items-center mt-16 mb-8" v-show="!disabled">
    <span class="relative flex size-10 animate-bounce">
      <span
        class="absolute inline-flex h-full w-full animate-ping rounded-full bg-reddit opacity-75"
      ></span>

      <IconReddit class="text-reddit size-10" />
    </span>
  </div>
</template>
