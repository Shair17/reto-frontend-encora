export interface RedditPostDetail {
  id: string;
  title: string;
  author: string;
  selftext: string;
  thumbnail: string;
  image?: string | null;
  url: string;
  permalink: string;
  num_comments: number;
  created_utc: number;
  score: number;
  is_video: boolean;
  media?: {
    reddit_video?: {
      fallback_url: string;
    };
  };
  preview?: {
    images?: {
      source: {
        url: string;
      };
    }[];
  };
}

export interface RedditPost {
  id: string;
  title: string;
  author: string;
  subreddit: string;
  selftext: string;
  url: string;
  permalink: string;
  thumbnail: string;
  ups: number;
  score: number;
  num_comments: number;
  created_utc: number;
  domain: string;
  is_video: boolean;
  post_hint?: string;
  preview?: {
    images: {
      source: {
        url: string;
        width: number;
        height: number;
      };
      resolutions: {
        url: string;
        width: number;
        height: number;
      }[];
      id: string;
    }[];
    enabled: boolean;
  };
}

export interface RedditApiChild {
  kind: string;
  data: RedditPost;
}

export interface RedditApiListing {
  kind: 'Listing';
  data: {
    after: string | null;
    before: string | null;
    dist: number;
    children: RedditApiChild[];
  };
}

export interface RedditPageResponse {
  posts: RedditPost[];
  after: string | null;
}
