import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ProjectImage from '../ProjectImage';

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

describe('ProjectImage', () => {
  const mockImages = [
    {
      src: '/test-image.jpg',
      alt: 'Test image',
      caption: 'Test caption',
    },
    {
      src: '/test-image-2.jpg',
      alt: 'Test image 2',
    },
  ];

  const mockFeaturedImages = [
    {
      src: '/featured-image.jpg',
      alt: 'Featured image',
      featured: true,
      caption: 'Featured caption',
    },
    ...mockImages,
  ];

  it('renders the main image correctly', () => {
    render(
      <ProjectImage
        images={mockImages}
        title="Test Project"
      />
    );

    const image = screen.getByAltText('Test image');
    expect(image).toBeInTheDocument();
  });

  it('renders featured image when available', () => {
    render(
      <ProjectImage
        images={mockFeaturedImages}
        title="Test Project"
      />
    );

    const image = screen.getByAltText('Featured image');
    expect(image).toBeInTheDocument();
  });

  it('shows caption when enabled', () => {
    render(
      <ProjectImage
        images={mockImages}
        title="Test Project"
        showCaption={true}
      />
    );

    const caption = screen.getByText('Test caption');
    expect(caption).toBeInTheDocument();
  });

  it('hides caption when disabled', () => {
    render(
      <ProjectImage
        images={mockImages}
        title="Test Project"
        showCaption={false}
      />
    );

    const caption = screen.queryByText('Test caption');
    expect(caption).not.toBeInTheDocument();
  });

  it('shows image count badge when multiple images', () => {
    render(
      <ProjectImage
        images={mockImages}
        title="Test Project"
      />
    );

    const badge = screen.getByText('2 images');
    expect(badge).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    render(
      <ProjectImage
        images={mockImages}
        title="Test Project"
        onClick={handleClick}
      />
    );

    const container = screen.getByAltText('Test image').parentElement;
    fireEvent.click(container!);
    expect(handleClick).toHaveBeenCalled();
  });

  it('applies featured aspect ratio when featured prop is true', () => {
    render(
      <ProjectImage
        images={mockImages}
        title="Test Project"
        featured={true}
      />
    );

    const container = screen.getByAltText('Test image').parentElement?.parentElement;
    expect(container).toHaveClass('aspect-[16/9]');
  });

  it('applies default aspect ratio when featured prop is false', () => {
    render(
      <ProjectImage
        images={mockImages}
        title="Test Project"
        featured={false}
      />
    );

    const container = screen.getByAltText('Test image').parentElement?.parentElement;
    expect(container).toHaveClass('aspect-[4/3]');
  });

  it('renders nothing when no images are provided', () => {
    const { container } = render(
      <ProjectImage
        images={[]}
        title="Test Project"
      />
    );

    expect(container.firstChild).toBeNull();
  });
});
