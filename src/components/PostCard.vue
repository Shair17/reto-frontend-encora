<script setup lang="ts">
// core
import { computed } from 'vue';

// components
import AppButton from './AppButton.vue';

// utils
import { cn } from '@/utils/cn';
import { getFromNow } from '@/utils/date';

// types
import type { RedditPost } from '@/types/reddit';

const props = defineProps<{
  post: RedditPost;
  selected?: boolean;
  read?: boolean;
  onPostPress?: () => void;
  onPostDelete?: () => void;
}>();

const relativeTime = computed(() => getFromNow(props.post.created_utc));

function openFullImage() {
  const url = props.post.preview?.images?.[0]?.source?.url;
  if (url) {
    window.open(url.replace('&amp;', '&'), '_blank');
  }
}

function isValidImage(url: string): boolean {
  return url.startsWith('http');
}
</script>

<template>
  <article
    :class="
      cn(
        'p-4 transition group rounded-xl relative border border-dotted',
        selected ? 'bg-blue-100' : 'hover:bg-neutral-200',
        !read ? 'bg-neutral-100 border-neutral-100' : 'border-neutral-200',
      )
    "
  >
    <!-- Discard Button -->
    <AppButton
      @click="onPostDelete"
      variant="destructive"
      class="absolute bottom-4 right-4 text-xs z-10 px-2 py-1.5 h-auto"
      size="sm"
      >Descartar</AppButton
    >

    <router-link
      :to="post.id"
      class="flex flex-col sm:flex-row gap-4 sm:items-start w-full relative"
      @click="onPostPress"
    >
      <!-- Image: only visible on the left in desktop -->
      <div
        v-if="post.thumbnail && isValidImage(post.thumbnail)"
        class="sm:block sm:shrink-0 order-2 sm:order-0"
      >
        <img
          :src="post.thumbnail"
          :alt="post.title"
          class="w-full sm:w-28 sm:h-28 object-cover rounded-lg"
          @click.stop="openFullImage"
        />
      </div>

      <!-- Content -->
      <div class="flex-1 min-w-0 w-full">
        <div class="flex items-center justify-between">
          <!-- Title -->
          <h2
            :class="
              cn(
                'text-lg font-bold leading-snug line-clamp-3 group-hover:underline',
                selected && 'underline',
                read && !selected ? 'text-neutral-500' : 'text-black',
              )
            "
          >
            {{ post.title }}
          </h2>
          <!-- Unread indicator -->
          <div v-if="!read" class="ml-auto self-start">
            <span class="inline-block w-3 h-3 bg-blue-500 rounded-full"></span>
          </div>
        </div>

        <!-- Meta info -->
        <div
          :class="
            cn(
              'text-sm mt-2 space-x-2',
              read && !selected ? 'text-neutral-400' : 'text-neutral-600',
            )
          "
        >
          <span
            >Por <strong>{{ post.author }}</strong></span
          >
          <span>·</span>
          <span>{{ relativeTime }}</span>
          <span>·</span>
          <span>{{ post.num_comments }} comentarios</span>
        </div>
      </div>
    </router-link>
  </article>
</template>
