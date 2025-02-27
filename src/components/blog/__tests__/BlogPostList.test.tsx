/**
 * @vitest-environment jsdom
 */

import { type ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { BlogPostList } from '../BlogPostList';
import { BlogPost, BlogCategory, BlogPostStatus } from '@/types/Blog';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: (props: any) => <div {...props} />,
    article: (props: any) => <article {...props} />,
  },
}));

const renderWithRouter = (component: ReactNode) => {
  return render(
    <MemoryRouter>
      {component}
    </MemoryRouter>
  );
};

describe('BlogPostList', () => {
  const mockPosts: BlogPost[] = [
    {
      title: 'Test Post 1',
      slug: 'test-post-1',
      description: 'Test description 1',
      author: {
        name: 'Test Author',
        avatar: '/test-avatar.jpg',
      },
      publishedAt: '2024-02-26',
      category: BlogCategory.TECHNOLOGY,
      tags: [
        {
          id: '1',
          name: 'Test',
          slug: 'test',
        },
      ],
      coverImage: {
        url: '/test-image.jpg',
        alt: 'Test Image',
        caption: 'A test image caption',
      },
      content: [],
      status: BlogPostStatus.PUBLISHED,
      readingTime: 5,
      featured: true,
    },
    {
      title: 'Test Post 2',
      slug: 'test-post-2',
      description: 'Test description 2',
      author: {
        name: 'Test Author',
        avatar: '/test-avatar.jpg',
      },
      publishedAt: '2024-02-25',
      category: BlogCategory.WEB_DEVELOPMENT,
      tags: [
        {
          id: '2',
          name: 'Test',
          slug: 'test',
        },
      ],
      content: [],
      status: BlogPostStatus.PUBLISHED,
      readingTime: 3,
      featured: false,
      coverImage: {
        url: '/test-cover-2.jpg',
        alt: 'Test Cover Image 2',
      },
    },
  ];

  it('renders all blog posts', () => {
    renderWithRouter(<BlogPostList posts={mockPosts} />);

    // Check if both posts are rendered
    expect(screen.getByText('Test Post 1')).toBeInTheDocument();
    expect(screen.getByText('Test Post 2')).toBeInTheDocument();

    // Check if descriptions are rendered
    expect(screen.getByText('Test description 1')).toBeInTheDocument();
    expect(screen.getByText('Test description 2')).toBeInTheDocument();

    // Check if author names are rendered
    expect(screen.getAllByText('Test Author')).toHaveLength(2);

    // Check if reading times are rendered
    expect(screen.getByText('5 min read')).toBeInTheDocument();
    expect(screen.getByText('3 min read')).toBeInTheDocument();

    // Check if categories are rendered
    expect(screen.getByText('technology')).toBeInTheDocument();
    expect(screen.getByText('web-development')).toBeInTheDocument();
  });

  it('shows only featured posts when showFeatured is true', () => {
    renderWithRouter(<BlogPostList posts={mockPosts} showFeatured={true} />);

    // Only featured post should be rendered
    expect(screen.getByText('Test Post 1')).toBeInTheDocument();
    expect(screen.queryByText('Test Post 2')).not.toBeInTheDocument();

    // Featured badge should be visible
    expect(screen.getByText('Featured')).toBeInTheDocument();
  });

  it('renders blog posts', () => {
    renderWithRouter(<BlogPostList posts={mockPosts} />);
    
    expect(screen.getByText('Test Post 1')).toBeInTheDocument();
    expect(screen.getByText('Test description 1')).toBeInTheDocument();
    expect(screen.getByText('Test Author')).toBeInTheDocument();
    expect(screen.getByText('A test image caption')).toBeInTheDocument();
    expect(screen.getByAltText('Test Image')).toBeInTheDocument();
    expect(screen.getByText('5 min read')).toBeInTheDocument();
  });

  it('renders empty state when no posts', () => {
    renderWithRouter(<BlogPostList posts={[]} />);
    expect(screen.getByText(/no posts found/i)).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = renderWithRouter(
      <BlogPostList posts={mockPosts} className="custom-class" />
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('renders post without cover image', () => {
    const postsWithoutCover = [{
      ...mockPosts[0],
      coverImage: undefined,
    }];

    renderWithRouter(<BlogPostList posts={postsWithoutCover} />);
    expect(screen.getByText('Test Post 1')).toBeInTheDocument();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('renders post without caption', () => {
    const postsWithoutCaption = [{
      ...mockPosts[0],
      coverImage: {
        url: '/test-image.jpg',
        alt: 'Test Image',
      },
    }];

    renderWithRouter(<BlogPostList posts={postsWithoutCaption} />);
    expect(screen.getByAltText('Test Image')).toBeInTheDocument();
    expect(screen.queryByText('A test image caption')).not.toBeInTheDocument();
  });

  it('renders correct date format', () => {
    renderWithRouter(<BlogPostList posts={mockPosts} />);

    // Check if dates are formatted correctly
    expect(screen.getByText('February 26, 2024')).toBeInTheDocument();
    expect(screen.getByText('February 25, 2024')).toBeInTheDocument();
  });
});
