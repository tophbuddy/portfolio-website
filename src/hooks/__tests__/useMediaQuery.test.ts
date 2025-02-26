import { renderHook } from '@testing-library/react';
import { useMediaQuery } from '../useMediaQuery';

describe('useMediaQuery', () => {
  const matchMediaMock = jest.fn();

  beforeAll(() => {
    // Mock window.matchMedia
    window.matchMedia = matchMediaMock;
  });

  beforeEach(() => {
    matchMediaMock.mockReset();
  });

  it('returns false when window is not available', () => {
    const windowSpy = jest.spyOn(global, 'window', 'get');
    windowSpy.mockImplementation(() => undefined as any);

    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'));
    expect(result.current).toBe(false);

    windowSpy.mockRestore();
  });

  it('returns initial match state', () => {
    matchMediaMock.mockImplementation((query) => ({
      matches: true,
      media: query,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));

    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'));
    expect(result.current).toBe(true);
  });

  it('updates when media query changes', () => {
    let listener: (event: MediaQueryListEvent) => void;
    
    matchMediaMock.mockImplementation((query) => ({
      matches: false,
      media: query,
      addEventListener: (_: string, cb: any) => {
        listener = cb;
      },
      removeEventListener: jest.fn(),
    }));

    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'));
    expect(result.current).toBe(false);

    // Simulate media query change
    listener({ matches: true } as MediaQueryListEvent);
    expect(result.current).toBe(true);
  });

  it('cleans up event listener on unmount', () => {
    const removeEventListener = jest.fn();
    
    matchMediaMock.mockImplementation((query) => ({
      matches: true,
      media: query,
      addEventListener: jest.fn(),
      removeEventListener,
    }));

    const { unmount } = renderHook(() => useMediaQuery('(min-width: 768px)'));
    unmount();

    expect(removeEventListener).toHaveBeenCalled();
  });
});
