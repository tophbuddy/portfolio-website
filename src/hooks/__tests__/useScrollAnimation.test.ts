import { renderHook } from '@testing-library/react';
import { useScrollAnimation } from '../useScrollAnimation';

// Mock IntersectionObserver
const mockIntersectionObserver = jest.fn();
const mockObserve = jest.fn();
const mockUnobserve = jest.fn();

beforeEach(() => {
  // Reset all mocks
  mockIntersectionObserver.mockReset();
  mockObserve.mockReset();
  mockUnobserve.mockReset();

  // Setup IntersectionObserver mock
  mockIntersectionObserver.mockReturnValue({
    observe: mockObserve,
    unobserve: mockUnobserve,
    disconnect: jest.fn(),
  });

  window.IntersectionObserver = mockIntersectionObserver;
});

describe('useScrollAnimation', () => {
  it('returns initial state', () => {
    const { result } = renderHook(() => useScrollAnimation());

    expect(result.current.inView).toBe(false);
    expect(result.current.hasAnimated).toBe(false);
    expect(result.current.ref.current).toBeNull();
    expect(result.current.style).toEqual(expect.objectContaining({
      opacity: 0,
      transform: expect.any(String),
      transition: expect.any(String),
      willChange: 'opacity, transform',
    }));
  });

  it('creates IntersectionObserver with default options', () => {
    renderHook(() => useScrollAnimation());

    expect(mockIntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      {
        threshold: 0.1,
        rootMargin: '0px',
      }
    );
  });

  it('creates IntersectionObserver with custom options', () => {
    renderHook(() =>
      useScrollAnimation({
        threshold: 0.5,
        rootMargin: '10px',
      })
    );

    expect(mockIntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      {
        threshold: 0.5,
        rootMargin: '10px',
      }
    );
  });

  it('applies custom animation options', () => {
    const { result } = renderHook(() =>
      useScrollAnimation({
        duration: 1000,
        delay: 200,
        easing: 'ease-in-out',
        direction: 'left',
        distance: 100,
      })
    );

    expect(result.current.style.transition).toContain('1000ms');
    expect(result.current.style.transition).toContain('200ms');
    expect(result.current.style.transition).toContain('ease-in-out');
    expect(result.current.style.transform).toContain('translateX(100px)');
  });

  it('handles different animation directions', () => {
    const directions = ['up', 'down', 'left', 'right'] as const;
    const expectedTransforms = {
      up: 'translateY(50px)',
      down: 'translateY(-50px)',
      left: 'translateX(50px)',
      right: 'translateX(-50px)',
    };

    directions.forEach((direction) => {
      const { result } = renderHook(() =>
        useScrollAnimation({ direction })
      );

      expect(result.current.style.transform).toBe(expectedTransforms[direction]);
    });
  });

  it('cleans up observer on unmount', () => {
    const { unmount } = renderHook(() => useScrollAnimation());

    unmount();

    expect(mockUnobserve).toHaveBeenCalled();
  });
});
