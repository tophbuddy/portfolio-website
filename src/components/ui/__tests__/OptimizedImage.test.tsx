import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import OptimizedImage from '../OptimizedImage';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    img: ({ children, ...props }: any) => <img {...props}>{children}</img>,
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('OptimizedImage', () => {
  const mockProps = {
    src: '/test.jpg',
    alt: 'Test image',
    blurDataUrl: 'data:image/jpeg;base64,test',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders with basic props', () => {
    render(<OptimizedImage {...mockProps} />);
    
    const img = screen.getByAltText('Test image');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/test.jpg');
  });

  it('shows blur placeholder while loading', () => {
    render(<OptimizedImage {...mockProps} />);
    
    const placeholder = screen.getByAltText('');
    expect(placeholder).toHaveAttribute('src', mockProps.blurDataUrl);
  });

  it('shows loading spinner when no blur data is provided', () => {
    render(<OptimizedImage src={mockProps.src} alt={mockProps.alt} />);
    
    const spinner = screen.getByRole('img', { hidden: true });
    expect(spinner).toBeInTheDocument();
  });

  it('handles image load completion', async () => {
    const { container } = render(<OptimizedImage {...mockProps} />);
    
    const img = screen.getByAltText('Test image');
    img.dispatchEvent(new Event('load'));

    await waitFor(() => {
      const placeholder = container.querySelector('[aria-hidden="true"]');
      expect(placeholder).not.toBeInTheDocument();
    });
  });

  it('handles image load error', async () => {
    render(<OptimizedImage {...mockProps} />);
    
    const img = screen.getByAltText('Test image');
    img.dispatchEvent(new Event('error'));

    await waitFor(() => {
      expect(screen.getByText('Failed to load image')).toBeInTheDocument();
    });
  });

  it('applies custom className and styles', () => {
    const { container } = render(
      <OptimizedImage
        {...mockProps}
        className="custom-class"
        width={200}
        height={150}
        objectFit="contain"
      />
    );
    
    expect(container.firstChild).toHaveClass('custom-class');
    expect(container.firstChild).toHaveStyle({
      width: '200px',
      height: '150px',
    });
  });

  it('generates correct srcSet for different formats', () => {
    render(<OptimizedImage {...mockProps} />);
    
    const sources = screen.getAllByRole('img', { hidden: true });
    expect(sources).toHaveLength(2); // Main image and blur placeholder

    const picture = sources[0].closest('picture');
    expect(picture?.querySelectorAll('source')).toHaveLength(3); // AVIF, WebP, and fallback
  });

  it('sets correct loading attribute based on priority', () => {
    const { rerender } = render(<OptimizedImage {...mockProps} priority={true} />);
    
    let img = screen.getByAltText('Test image');
    expect(img).toHaveAttribute('loading', 'eager');

    rerender(<OptimizedImage {...mockProps} priority={false} />);
    img = screen.getByAltText('Test image');
    expect(img).toHaveAttribute('loading', 'lazy');
  });

  it('resets loading state when src changes', async () => {
    const { rerender } = render(<OptimizedImage {...mockProps} />);
    
    const img = screen.getByAltText('Test image');
    img.dispatchEvent(new Event('load'));

    await waitFor(() => {
      const placeholder = screen.queryByAltText('');
      expect(placeholder).not.toBeInTheDocument();
    });

    rerender(<OptimizedImage {...mockProps} src="/new-test.jpg" />);
    expect(screen.getByAltText('')).toBeInTheDocument(); // Blur placeholder is back
  });
});
