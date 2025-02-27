import '@testing-library/jest-dom';
import { expect, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// Mock IntersectionObserver
const mockIntersectionObserver = vi.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
});
window.IntersectionObserver = mockIntersectionObserver;

// Mock ResizeObserver
window.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock matchMedia
window.matchMedia = vi.fn().mockImplementation(query => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
}));

// Clean up after each test
afterEach(() => {
  cleanup();
});

// Add custom matchers
expect.extend({
  toHaveBeenCalledBefore(received: any, other: any) {
    const receivedCalls = received.mock.invocationCallOrder;
    const otherCalls = other.mock.invocationCallOrder;

    if (receivedCalls.length === 0) {
      return {
        message: () => `expected ${received} to have been called`,
        pass: false,
      };
    }

    if (otherCalls.length === 0) {
      return {
        message: () => `expected ${other} to have been called`,
        pass: false,
      };
    }

    const pass = Math.min(...receivedCalls) < Math.min(...otherCalls);

    return {
      message: () =>
        `expected ${received} to have been called before ${other}`,
      pass,
    };
  },
});
