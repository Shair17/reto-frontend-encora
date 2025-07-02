// core
import { describe, it, expect } from 'vitest';

// utils
import { getFromNow } from '../date';

describe('getFromNow', () => {
  it('should return "hace unos segundos" for current timestamp', () => {
    const now = Math.floor(Date.now() / 1000);
    const result = getFromNow(now);
    expect(result).toMatch(/hace.*segundos/);
  });
});
