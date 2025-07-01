<script setup lang="ts">
// core
import { computed, onMounted, watchEffect } from 'vue';
import { useRouter } from 'vue-router';

// composables
import { usePostsStore } from '@/stores/posts';
import { useGetRedditPostDetail } from '@/composables/useGetRedditPostDetail';

// components
import { toast } from 'vue-sonner';
import AppButton from './AppButton.vue';
import SkeletonPlaceholder from './SkeletonPlaceholder.vue';

// utils
import { cn } from '@/utils/cn';
import { getFromNow } from '@/utils/date';

// types
import type { RedditPostDetail } from '@/types/reddit';

const props = defineProps<{ postId: string }>();

const router = useRouter();
const postStore = usePostsStore();
const redditPostDetailQuery = useGetRedditPostDetail(props.postId);

const isLoading = computed(() => redditPostDetailQuery.isLoading.value);
const isError = computed(() => redditPostDetailQuery.isError.value);
const post = computed(() => redditPostDetailQuery.data.value);
const isDeleted = computed(() => postStore.isDeleted(props.postId));

async function onRetry() {
  await redditPostDetailQuery.refetch();
}

function onDownloadMedia(url: string, filename = 'media') {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.target = '_blank';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function getImageUrl(post: RedditPostDetail): string | null {
  const rawPreview = post?.preview?.images?.[0]?.source?.url;
  const previewUrl = rawPreview ? rawPreview.replace('&amp;', '&') : null;
  const thumbnail = post?.thumbnail?.startsWith('http') ? post.thumbnail : null;
  return previewUrl || thumbnail || null;
}

onMounted(() => {
  // Scroll to top with smooth behavior on component mount and route change
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

watchEffect(() => {
  if (!isLoading.value && !post.value) {
    router.replace('/');
    return;
  }

  if (post.value && isDeleted.value) {
    toast.info('Esta publicación fue descartada', {
      description: 'Redirigiéndote al inicio...',
      duration: 3000,
    });
    router.replace('/');
  }
});
</script>

<template>
  <article class="animate-fade-in space-y-4 rounded-xl transition-all p-4 sm:p-6 bg-white">
    <template v-if="isLoading || isDeleted">
      <SkeletonPlaceholder class="h-6 rounded-xl" />

      <SkeletonPlaceholder class="h-5 rounded-xl" />

      <SkeletonPlaceholder class="h-96 rounded-xl" />

      <SkeletonPlaceholder class="h-10 rounded-xl" />
    </template>

    <template v-else-if="isError">
      <p class="text-red-500 text-center font-semibold">Error al cargar la publicación</p>

      <AppButton @click="onRetry">Reintentar</AppButton>
    </template>

    <template v-else-if="post">
      <!-- Title -->
      <h1 class="text-xl font-bold leading-tight">
        {{ post.title }}
      </h1>

      <!-- Author and date -->
      <div class="text-sm text-neutral-500">
        Publicado por <span class="font-semibold">{{ post?.author }}</span> ·
        {{ getFromNow(post.created_utc) }}
      </div>

      <!-- Video -->
      <template v-if="post.is_video && post.media?.reddit_video?.fallback_url">
        <video
          :src="post.media.reddit_video.fallback_url"
          controls
          class="rounded-md w-full max-h-[480px] border"
          autoplay
        />
        <div class="flex justify-end">
          <AppButton
            size="sm"
            @click="onDownloadMedia(post.media.reddit_video.fallback_url, `${post.title}.mp4`)"
          >
            Descargar video
          </AppButton>
        </div>
      </template>

      <!-- Image (if it's not a video and there's a valid image) -->
      <template v-else-if="!post.is_video && getImageUrl(post)">
        <img
          :src="getImageUrl(post)!"
          class="rounded-md w-full max-h-96 object-contain border border-neutral-200 border-dashed"
          :alt="post.title"
        />

        <div class="flex justify-end">
          <AppButton size="sm" @click="onDownloadMedia(getImageUrl(post)!, `${post.title}.jpg`)">
            Descargar imagen
          </AppButton>
        </div>
      </template>

      <!-- Post text -->
      <div
        :class="
          cn(
            'text-base leading-relaxed text-neutral-700 whitespace-pre-line',
            !post.selftext && 'italic',
          )
        "
      >
        {{ post.selftext || 'Sin descripción.' }}
      </div>

      <!-- Footer -->
      <div
        class="text-sm text-neutral-500 flex items-center gap-4 border-t border-neutral-200 border-dashed pt-4"
      >
        <span>👍 {{ post.score }}</span>
        <span>💬 {{ post.num_comments }} comentarios</span>
        <a
          :href="`https://reddit.com${post.permalink}`"
          target="_blank"
          class="ml-auto text-blue-600 hover:underline text-sm"
        >
          Ver en Reddit
        </a>
      </div>
    </template>
  </article>
</template>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(8px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out both;
}
</style>
