import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
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
  },
}));

describe('ProjectGrid', () => {
  const mockProjects: Project[] = [
    {
      id: '1',
      title: 'Featured Project',
      summary: 'A featured project',
      description: 'Featured project description',
      images: [],
      technologies: [{ name: 'React' }],
      links: [],
      date: '2025-02-25',
      category: 'Web',
      featured: true,
    },
    {
      id: '2',
      title: 'Regular Project 1',
      summary: 'A regular project',
      description: 'Regular project description',
      images: [],
      technologies: [{ name: 'TypeScript' }],
      links: [],
      date: '2025-02-25',
      category: 'Mobile',
    },
    {
      id: '3',
      title: 'Regular Project 2',
      summary: 'Another regular project',
      description: 'Another regular project description',
      images: [],
      technologies: [{ name: 'React' }],
      links: [],
      date: '2025-02-25',
      category: 'Web',
    },
  ];

  it('renders all projects by default', () => {
    render(<ProjectGrid projects={mockProjects} />);
    
    const cards = screen.getAllByTestId('project-card');
    expect(cards).toHaveLength(3);
  });

  it('filters featured projects correctly', () => {
    render(<ProjectGrid projects={mockProjects} showFeatured={true} />);
    
    const cards = screen.getAllByTestId('project-card');
    expect(cards).toHaveLength(1);
    expect(cards[0]).toHaveTextContent('Featured Project');
  });

  it('filters by category correctly', () => {
    render(<ProjectGrid projects={mockProjects} category="Web" />);
    
    const cards = screen.getAllByTestId('project-card');
    expect(cards).toHaveLength(2);
    expect(cards[0]).toHaveTextContent('Featured Project');
    expect(cards[1]).toHaveTextContent('Regular Project 2');
  });

  it('filters by technology correctly', () => {
    render(<ProjectGrid projects={mockProjects} technology="React" />);
    
    const cards = screen.getAllByTestId('project-card');
    expect(cards).toHaveLength(2);
    expect(cards[0]).toHaveTextContent('Featured Project');
    expect(cards[1]).toHaveTextContent('Regular Project 2');
  });

  it('displays empty state when no projects match filters', () => {
    render(
      <ProjectGrid
        projects={mockProjects}
        category="Desktop"
        technology="Python"
      />
    );
    
    expect(screen.queryByTestId('project-card')).not.toBeInTheDocument();
    expect(screen.getByText('No projects found')).toBeInTheDocument();
  });

  it('applies featured styling to featured projects', () => {
    render(<ProjectGrid projects={mockProjects} />);
    
    const cards = screen.getAllByTestId('project-card');
    const featuredCard = cards.find(card => 
      card.getAttribute('data-featured') === 'true'
    );
    expect(featuredCard).toHaveTextContent('Featured Project');
  });

  it('applies custom className', () => {
    const { container } = render(
      <ProjectGrid projects={mockProjects} className="custom-class" />
    );
    
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('maintains correct order with featured projects first', () => {
    render(<ProjectGrid projects={mockProjects} />);
    
    const cards = screen.getAllByTestId('project-card');
    expect(cards[0]).toHaveTextContent('Featured Project');
    expect(cards[1]).toHaveTextContent('Regular Project');
  });
});
