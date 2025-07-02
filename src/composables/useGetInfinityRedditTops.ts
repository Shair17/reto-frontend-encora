// core
import axios from 'axios';
import { useInfiniteQuery } from '@tanstack/vue-query';

// utils
import { endpoints } from '@/endpoints';
import { DEFAULT_MAX_ITEMS, PAGE_SIZE } from '@/constants';

// types
import type { RedditApiListing, RedditPageResponse } from '@/types/reddit';

export function useGetInfinityRedditTops(maxItems = DEFAULT_MAX_ITEMS) {
  const query = useInfiniteQuery<RedditPageResponse>({
    queryKey: ['reddit-top', maxItems],
    initialPageParam: null,
    queryFn: async ({ pageParam }) => {
      const response = await axios.get<RedditApiListing>(endpoints.top, {
        params: {
          limit: PAGE_SIZE,
          after: pageParam,
          raw_json: 1,
        },
      });

      const children = response.data.data.children;
      const after = response.data.data.after;

      return {
        posts: children.map((child) => child.data),
        after,
      };
    },
    getNextPageParam: (lastPage, allPages) => {
      const total = allPages.reduce((sum, page) => sum + page.posts.length, 0);
      return total >= maxItems ? undefined : lastPage.after;
    },
  });

  return {
    ...query,
    maxItems,
  };
}
