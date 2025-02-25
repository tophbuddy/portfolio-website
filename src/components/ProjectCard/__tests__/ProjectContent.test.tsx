import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProjectContent from '../ProjectContent';

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    h3: ({ children, ...props }: any) => <h3 {...props}>{children}</h3>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
  },
}));

describe('ProjectContent', () => {
  const mockProject = {
    title: 'Test Project',
    summary: 'Test summary',
    description: '<p>Test description</p>',
    status: 'completed' as const,
  };

  it('renders title and summary correctly', () => {
    render(<ProjectContent project={mockProject} />);
    
    expect(screen.getByText('Test Project')).toBeInTheDocument();
    expect(screen.getByText('Test summary')).toBeInTheDocument();
  });

  it('does not show description by default', () => {
    render(<ProjectContent project={mockProject} />);
    
    expect(screen.queryByText('Test description')).not.toBeInTheDocument();
  });

  it('shows description when featured', () => {
    render(<ProjectContent project={mockProject} featured={true} />);
    
    const description = document.querySelector('.prose');
    expect(description).toBeInTheDocument();
    expect(description?.innerHTML).toContain('Test description');
  });

  it('shows status badge for in-progress projects', () => {
    render(
      <ProjectContent
        project={{ ...mockProject, status: 'in-progress' }}
      />
    );
    
    expect(screen.getByText('In Progress')).toBeInTheDocument();
  });

  it('shows status badge for planned projects', () => {
    render(
      <ProjectContent
        project={{ ...mockProject, status: 'planned' }}
      />
    );
    
    expect(screen.getByText('Planned')).toBeInTheDocument();
  });

  it('does not show status badge for completed projects', () => {
    render(<ProjectContent project={mockProject} />);
    
    expect(screen.queryByText('Completed')).not.toBeInTheDocument();
  });

  it('applies featured styles when featured prop is true', () => {
    render(<ProjectContent project={mockProject} featured={true} />);
    
    const title = screen.getByText('Test Project');
    expect(title).toHaveClass('text-2xl', 'md:text-3xl');
  });

  it('applies default styles when featured prop is false', () => {
    render(<ProjectContent project={mockProject} featured={false} />);
    
    const title = screen.getByText('Test Project');
    expect(title).toHaveClass('text-xl', 'md:text-2xl');
  });

  it('applies custom className when provided', () => {
    render(
      <ProjectContent
        project={mockProject}
        className="custom-class"
      />
    );
    
    const container = screen.getByText('Test Project').parentElement;
    expect(container).toHaveClass('custom-class');
  });
});
