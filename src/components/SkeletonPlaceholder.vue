<script setup lang="ts">
// core
import type { HTMLAttributes } from 'vue';

// utils
import { cn } from '@/utils/cn';

interface SkeletonProps {
  class?: HTMLAttributes['class'];
}

const props = defineProps<SkeletonProps>();
</script>

<template>
  <div :class="cn('animate-pulse rounded-md bg-neutral-200/80', props.class)" />
</template>
