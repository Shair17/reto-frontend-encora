import { defineStore } from 'pinia';
import { reactive } from 'vue';

interface PostMetadata {
  id: string;
  read: boolean;
  deleted: boolean;
}

export const usePostsStore = defineStore(
  'postsStore',
  () => {
    const posts = reactive<Record<string, PostMetadata>>({});

    function markAsRead(id: string) {
      if (!posts[id]) {
        posts[id] = { id, read: true, deleted: false };
      } else {
        posts[id].read = true;
      }
    }

    function markAsDeleted(id: string) {
      if (!posts[id]) {
        posts[id] = { id, read: false, deleted: true };
      } else {
        posts[id].deleted = true;
      }
    }

    function restoreAllPosts() {
      for (const id in posts) {
        posts[id].deleted = false;
      }
    }

    function restorePost(id: string) {
      if (posts[id]) {
        posts[id].deleted = false;
      }
    }

    function hasDeletedPosts() {
      return Object.values(posts).some((p) => p.deleted);
    }

    function isRead(id: string) {
      return posts[id]?.read ?? false;
    }

    function isDeleted(id: string) {
      return posts[id]?.deleted ?? false;
    }

    return {
      posts,
      markAsRead,
      markAsDeleted,
      restorePost,
      isRead,
      isDeleted,
      restoreAllPosts,
      hasDeletedPosts,
    };
  },
  {
    persist: {
      storage: localStorage,
    },
  },
);
