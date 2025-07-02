// core
import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';

// utils
import { usePostsStore } from '../posts';

describe('postsStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('marks a post as read', () => {
    const store = usePostsStore();
    store.markAsRead('123');
    expect(store.isRead('123')).toBe(true);
    expect(store.isDeleted('123')).toBe(false);
  });

  it('marks a post as deleted', () => {
    const store = usePostsStore();
    store.markAsDeleted('abc');
    expect(store.isDeleted('abc')).toBe(true);
    expect(store.isRead('abc')).toBe(false);
  });

  it('restores a deleted post', () => {
    const store = usePostsStore();
    store.markAsDeleted('p1');
    expect(store.isDeleted('p1')).toBe(true);

    store.restorePost('p1');
    expect(store.isDeleted('p1')).toBe(false);
  });

  it('restores all deleted posts', () => {
    const store = usePostsStore();
    store.markAsDeleted('p1');
    store.markAsDeleted('p2');

    store.restoreAllPosts();
    expect(store.isDeleted('p1')).toBe(false);
    expect(store.isDeleted('p2')).toBe(false);
  });

  it('detects if there are deleted posts', () => {
    const store = usePostsStore();
    expect(store.hasDeletedPosts()).toBe(false);

    store.markAsDeleted('xyz');
    expect(store.hasDeletedPosts()).toBe(true);
  });
});
