export const endpoints = {
  top: 'https://www.reddit.com/top.json',
  postDetail: (postId: string) => `https://www.reddit.com/comments/${postId}.json`,
};
