import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import '@testing-library/jest-dom';
import ProjectImage from '../ProjectImage';
import { ProjectImage as ProjectImageType } from '../../../types/Project';

// Mock OptimizedImage component
vi.mock('../../ui', () => ({
  OptimizedImage: ({ src, alt, ...props }: any) => <img src={src} alt={alt} {...props} />,
}));

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

describe('ProjectImage', () => {
  const mockImages: ProjectImageType[] = [
    {
      src: '/test.jpg',
      alt: 'Test Image',
      featured: true,
    },
    {
      src: '/test2.jpg',
      alt: 'Test Image 2',
    },
  ];

  it('renders featured image when available', () => {
    render(<ProjectImage images={mockImages} title="Test Project" />);
    
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', mockImages[0].src);
    expect(img).toHaveAttribute('alt', mockImages[0].alt);
  });

  it('renders first image when no featured image', () => {
    const imagesWithoutFeatured = mockImages.map(img => ({ ...img, featured: false }));
    render(<ProjectImage images={imagesWithoutFeatured} title="Test Project" />);
    
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', imagesWithoutFeatured[0].src);
  });

  it('applies custom className', () => {
    const { container } = render(
      <ProjectImage images={mockImages} title="Test Project" className="custom-class" />
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('applies featured styles when featured prop is true', () => {
    const { container } = render(
      <ProjectImage images={mockImages} title="Test Project" featured={true} />
    );
    expect(container.firstChild).toHaveClass('aspect-[16/9]');
  });

  it('shows caption when enabled', () => {
    const imagesWithCaption = [{ ...mockImages[0], caption: 'Test Caption' }];
    render(
      <ProjectImage 
        images={imagesWithCaption} 
        title="Test Project" 
        showCaption={true} 
      />
    );
    expect(screen.getByText('Test Caption')).toBeInTheDocument();
  });

  it('renders nothing when no images provided', () => {
    const { container } = render(<ProjectImage images={[]} title="Test Project" />);
    expect(container.firstChild).toBeNull();
  });
});
