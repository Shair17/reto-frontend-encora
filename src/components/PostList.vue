<script setup lang="ts">
// core
import { computed, watchEffect } from 'vue';
import { toast } from 'vue-sonner';

// composables
import { usePostsStore } from '@/stores/posts';
import { useGetInfinityRedditTops } from '@/composables/useGetInfinityRedditTops';

// components
import PostCard from './PostCard.vue';
import AppButton from './AppButton.vue';
import LoaderIndicator from './LoaderIndicator.vue';
import SkeletonPlaceholder from './SkeletonPlaceholder.vue';

// types
import type { RedditPost } from '@/types/reddit';

defineProps<{ selectedPostId?: string }>();

const postsStore = usePostsStore();

const infiniteRedditTopsQuery = useGetInfinityRedditTops();

const allPosts = computed<RedditPost[]>(
  () => infiniteRedditTopsQuery.data?.value?.pages.flatMap((page) => page.posts) ?? [],
);

const isLimitReached = computed(() => allPosts.value.length >= infiniteRedditTopsQuery.maxItems);

const allPostsAreDeleted = computed(
  () => isLimitReached.value && allPosts.value.every((post) => postsStore.isDeleted(post.id)),
);

function onMarkAllAsDeletedOrRestore() {
  if (allPostsAreDeleted.value) {
    postsStore.restoreAllPosts();
    toast.success('Todos los posts han sido restaurados');
  } else {
    for (const post of allPosts.value) {
      postsStore.markAsDeleted(post.id);
    }

    toast.info('Todos los posts han sido descartados');

    // load more posts if needed
    if (infiniteRedditTopsQuery.hasNextPage.value && !isLimitReached.value) {
      infiniteRedditTopsQuery.fetchNextPage();
    }
  }
}

function onPostPress(id: string) {
  if (postsStore.isRead(id)) return;

  postsStore.markAsRead(id);
  toast.info('Post marcado como leído');
}

function onPostDelete(id: string) {
  postsStore.markAsDeleted(id);
  toast.error('Post descartado');
}

watchEffect(() => {
  const allVisibleDeleted =
    allPosts.value.length > 0 && allPosts.value.every((post) => postsStore.isDeleted(post.id));

  if (
    allVisibleDeleted &&
    infiniteRedditTopsQuery.hasNextPage.value &&
    !isLimitReached.value &&
    !infiniteRedditTopsQuery.isFetchingNextPage.value
  ) {
    infiniteRedditTopsQuery.fetchNextPage();
  }
});
</script>

<template>
  <div class="flex justify-between items-center gap-2">
    <h1 class="text-2xl font-bold">Publicaciones</h1>

    <AppButton
      :variant="allPostsAreDeleted ? 'default' : 'destructive'"
      size="sm"
      @click="onMarkAllAsDeletedOrRestore"
      :disabled="infiniteRedditTopsQuery.isLoading.value"
    >
      {{ allPostsAreDeleted ? 'Restaurar Todo' : 'Descartar esta página' }}
    </AppButton>
  </div>

  <template v-if="infiniteRedditTopsQuery.isLoading.value">
    <template v-for="index in 10" :key="index">
      <SkeletonPlaceholder class="h-96 sm:h-36 w-full rounded-xl" />

      <hr v-if="index < 10" class="my-1 border-t border-neutral-200 border-dashed" />
    </template>
  </template>

  <template v-else-if="allPosts.length === 0 || allPostsAreDeleted">
    <p class="text-neutral-500 mt-2 text-center">No hay publicaciones :(</p>
  </template>

  <template v-else>
    <TransitionGroup tag="div" name="fade-slide" appear>
      <template v-for="(post, index) in allPosts" :key="post.id">
        <template v-if="!postsStore.isDeleted(post.id)">
          <PostCard
            :post="post"
            :selected="post.id === selectedPostId"
            :read="postsStore.isRead(post.id)"
            :onPostPress="() => onPostPress(post.id)"
            :onPostDelete="() => onPostDelete(post.id)"
          />
          <hr
            v-if="index < allPosts.length - 1"
            class="my-2 border-t border-neutral-200 border-dashed"
          />
        </template>
      </template>
    </TransitionGroup>
  </template>

  <LoaderIndicator
    v-if="infiniteRedditTopsQuery.hasNextPage.value && !isLimitReached && !allPostsAreDeleted"
    @load="infiniteRedditTopsQuery.fetchNextPage"
  />
</template>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(12px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}
</style>
