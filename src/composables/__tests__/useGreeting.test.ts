// core
import { nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// utils
import { useGreeting } from '../useGreeting';

describe('useGreeting', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  const mountComposable = () =>
    mount({
      template: '<div></div>',
      setup() {
        return { greeting: useGreeting() };
      },
    });

  it('returns "Buenos días" in the morning', () => {
    vi.setSystemTime(new Date('2024-01-01T08:00:00'));
    const wrapper = mountComposable();
    expect(wrapper.vm.greeting).toBe('Buenos días');
  });

  it('returns "Buenas tardes" in the afternoon', () => {
    vi.setSystemTime(new Date('2024-01-01T15:00:00'));
    const wrapper = mountComposable();
    expect(wrapper.vm.greeting).toBe('Buenas tardes');
  });

  it('returns "Buenas noches" in the evening', () => {
    vi.setSystemTime(new Date('2024-01-01T20:00:00'));
    const wrapper = mountComposable();
    expect(wrapper.vm.greeting).toBe('Buenas noches');
  });

  it('updates greeting after one hour', async () => {
    vi.setSystemTime(new Date('2024-01-01T11:00:00'));
    const wrapper = mountComposable();
    expect(wrapper.vm.greeting).toBe('Buenos días');

    vi.setSystemTime(new Date('2024-01-01T13:00:00'));
    vi.advanceTimersByTime(60 * 60 * 1000); // 1 hora

    await nextTick();
    expect(wrapper.vm.greeting).toBe('Buenas tardes');
  });

  it('clears the interval on unmount', () => {
    const clearSpy = vi.spyOn(global, 'clearInterval');
    const wrapper = mountComposable();
    wrapper.unmount();
    expect(clearSpy).toHaveBeenCalled();
  });
});
