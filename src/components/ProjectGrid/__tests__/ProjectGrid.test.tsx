import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProjectGrid from '../ProjectGrid';
import { Project } from '../../../types/Project';

// Mock ProjectCard component
vi.mock('../../ProjectCard/ProjectCard', () => ({
  default: ({ project, featured }: { project: Project; featured?: boolean }) => (
    <div data-testid="project-card" data-featured={featured}>
      {project.title}
    </div>
  ),
}));

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('ProjectGrid', () => {
  const generateProjects = (count: number): Project[] => {
    return Array.from({ length: count }, (_, i) => ({
      id: String(i + 1),
      title: `Project ${i + 1}`,
      summary: `Summary ${i + 1}`,
      description: `Description ${i + 1}`,
      images: [],
      technologies: [{ name: i % 2 === 0 ? 'React' : 'TypeScript' }],
      links: [],
      date: '2025-02-25',
      category: i % 2 === 0 ? 'Web' : 'Mobile',
      featured: i === 0,
    }));
  };

  const mockProjects = generateProjects(10);

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders initial batch of projects', () => {
    render(<ProjectGrid projects={mockProjects} initialLoadCount={4} />);
    
    const cards = screen.getAllByTestId('project-card');
    expect(cards).toHaveLength(4);
  });

  it('loads more projects when clicking load more', async () => {
    render(
      <ProjectGrid
        projects={mockProjects}
        initialLoadCount={4}
        loadMoreCount={2}
      />
    );
    
    expect(screen.getAllByTestId('project-card')).toHaveLength(4);

    const loadMoreButton = screen.getByText(/Load More/);
    fireEvent.click(loadMoreButton);

    // Wait for loading state
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    // Fast-forward timer
    vi.advanceTimersByTime(500);

    await waitFor(() => {
      expect(screen.getAllByTestId('project-card')).toHaveLength(6);
    });
  });

  it('shows correct number of remaining projects', () => {
    render(
      <ProjectGrid
        projects={mockProjects}
        initialLoadCount={4}
        loadMoreCount={2}
      />
    );
    
    expect(screen.getByText('(6 remaining)')).toBeInTheDocument();
  });

  it('hides load more button when all projects are visible', async () => {
    render(
      <ProjectGrid
        projects={mockProjects}
        initialLoadCount={10}
      />
    );
    
    expect(screen.queryByText(/Load More/)).not.toBeInTheDocument();
  });

  it('resets visible count when filters change', () => {
    const { rerender } = render(
      <ProjectGrid
        projects={mockProjects}
        initialLoadCount={4}
        category="Web"
      />
    );
    
    const initialCards = screen.getAllByTestId('project-card');
    const initialCount = initialCards.length;

    // Change category filter
    rerender(
      <ProjectGrid
        projects={mockProjects}
        initialLoadCount={4}
        category="Mobile"
      />
    );

    const newCards = screen.getAllByTestId('project-card');
    expect(newCards.length).toBeLessThanOrEqual(initialCount);
  });

  it('maintains featured projects at the top when loading more', async () => {
    render(
      <ProjectGrid
        projects={mockProjects}
        initialLoadCount={4}
        loadMoreCount={2}
      />
    );
    
    const firstCard = screen.getAllByTestId('project-card')[0];
    expect(firstCard).toHaveAttribute('data-featured', 'true');

    const loadMoreButton = screen.getByText(/Load More/);
    fireEvent.click(loadMoreButton);

    // Fast-forward timer
    vi.advanceTimersByTime(500);

    await waitFor(() => {
      const newFirstCard = screen.getAllByTestId('project-card')[0];
      expect(newFirstCard).toHaveAttribute('data-featured', 'true');
    });
  });

  it('shows loading state while loading more projects', () => {
    render(
      <ProjectGrid
        projects={mockProjects}
        initialLoadCount={4}
        loadMoreCount={2}
      />
    );
    
    const loadMoreButton = screen.getByText(/Load More/);
    fireEvent.click(loadMoreButton);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(loadMoreButton).toBeDisabled();
  });
});
