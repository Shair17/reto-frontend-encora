// core
import { describe, it, expect } from 'vitest';

// utils
import { parsePermalink } from '../url';

describe('parsePermalink', () => {
  it('should remove leading slash from subreddit path', () => {
    const input = '/r/vuejs/comments/abc123/my-post-title/';
    const result = parsePermalink(input);
    expect(result).toBe('r/vuejs/comments/abc123/my-post-title/');
  });

  it('should return unchanged permalink if already formatted', () => {
    const input = 'r/vuejs/comments/abc123/my-post-title/';
    const result = parsePermalink(input);
    expect(result).toBe('r/vuejs/comments/abc123/my-post-title/');
  });

  it('should not affect unrelated paths', () => {
    const input = '/u/someuser/comments/abc123';
    const result = parsePermalink(input);
    expect(result).toBe('/u/someuser/comments/abc123');
  });
});
