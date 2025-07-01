<script setup lang="ts">
// composables
import { useTypedRoute } from '@/composables/useTypedRoute';

// components
import PostList from '@/components/PostList.vue';
import PostDetail from '@/components/PostDetail.vue';

const route = useTypedRoute<{ postId: string }>();
const isDetailRoute = route.name === 'post-detail';
</script>

<template>
  <section class="pt-5 pb-8 sm:pb-10 lg:pb-16">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="grid gap-4" :class="isDetailRoute ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'">
        <aside
          class="grid grid-cols-1 gap-2 bg-white rounded-xl p-4 sm:p-6"
          :class="{ 'hidden lg:grid sticky top-[81px] self-start': isDetailRoute }"
        >
          <PostList :selectedPostId="route.params.postId" />
        </aside>

        <aside v-if="isDetailRoute">
          <PostDetail :postId="route.params.postId" />
        </aside>
      </div>
    </div>
  </section>
</template>
