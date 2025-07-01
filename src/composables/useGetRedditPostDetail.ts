// core
import axios from 'axios';
import { useQuery } from '@tanstack/vue-query';

// utils
import { endpoints } from '@/endpoints';

// types
import type { RedditPostDetail } from '@/types/reddit';

export function useGetRedditPostDetail(postId?: string) {
  return useQuery<RedditPostDetail>({
    queryKey: ['redditPostDetail', postId],
    enabled: !!postId,
    queryFn: async () => {
      const res = await axios.get(endpoints.postDetail(postId!));
      const post = res.data?.[0]?.data?.children?.[0]?.data;

      const previewUrl = post?.preview?.images?.[0]?.source?.url?.replaceAll('&amp;', '&');
      const thumbnail = post?.thumbnail?.startsWith('http') ? post.thumbnail : null;
      const image = previewUrl || thumbnail || null;

      return {
        id: post.id,
        title: post.title,
        author: post.author,
        selftext: post.selftext,
        thumbnail: post.thumbnail,
        image,
        url: post.url,
        permalink: post.permalink,
        num_comments: post.num_comments,
        created_utc: post.created_utc,
        score: post.score,
        is_video: post.is_video,
        media: post.media,
        preview: post.preview,
      };
    },
  });
}
