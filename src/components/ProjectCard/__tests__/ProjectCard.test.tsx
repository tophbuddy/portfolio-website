import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProjectCard from '../ProjectCard';
import { Project } from '../../../types/Project';

// Mock child components
vi.mock('../ProjectImage', () => ({
  default: ({ title }: { title: string }) => <div data-testid="project-image">{title}</div>,
}));

vi.mock('../ProjectContent', () => ({
  default: ({ project }: { project: Project }) => (
    <div data-testid="project-content">{project.title}</div>
  ),
}));

vi.mock('../TechStack', () => ({
  default: ({ technologies }: { technologies: any[] }) => (
    <div data-testid="tech-stack">
      {technologies.map(tech => tech.name).join(', ')}
    </div>
  ),
}));

vi.mock('../ProjectLinks', () => ({
  default: ({ links }: { links: any[] }) => (
    <div data-testid="project-links">
      {links.map(link => link.label).join(', ')}
    </div>
  ),
}));

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    article: ({ children, ...props }: any) => <article {...props}>{children}</article>,
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  useMotionTemplate: (strings: TemplateStringsArray, ...values: any[]) => '',
  useMotionValue: (initial: number) => ({
    set: vi.fn(),
    get: () => initial,
  }),
}));

describe('ProjectCard', () => {
  const mockProject: Project = {
    id: '1',
    title: 'Test Project',
    summary: 'A test project',
    description: 'This is a test project description',
    images: [
      {
        src: '/test.jpg',
        alt: 'Test Image',
        featured: true,
      },
    ],
    technologies: [
      {
        name: 'React',
        type: 'framework',
      },
      {
        name: 'TypeScript',
        type: 'language',
      },
    ],
    links: [
      {
        type: 'github',
        url: 'https://github.com/test',
        label: 'View Code',
      },
      {
        type: 'demo',
        url: 'https://demo.test',
        label: 'Live Demo',
      },
    ],
    date: '2025-02-25',
    category: 'Web',
  };

  it('renders all child components', () => {
    render(<ProjectCard project={mockProject} />);
    
    expect(screen.getByTestId('project-image')).toBeInTheDocument();
    expect(screen.getByTestId('project-content')).toBeInTheDocument();
    expect(screen.getByTestId('tech-stack')).toBeInTheDocument();
    expect(screen.getByTestId('project-links')).toBeInTheDocument();
  });

  it('passes featured prop to child components', () => {
    const { container } = render(<ProjectCard project={mockProject} featured={true} />);
    
    expect(container.firstChild).toHaveClass('lg:col-span-2');
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    render(<ProjectCard project={mockProject} onClick={handleClick} />);
    
    const card = screen.getByRole('article');
    fireEvent.click(card);
    expect(handleClick).toHaveBeenCalled();
  });

  it('applies custom className', () => {
    const { container } = render(
      <ProjectCard project={mockProject} className="custom-class" />
    );
    
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('handles mouse move events', () => {
    const { container } = render(<ProjectCard project={mockProject} />);
    const card = container.firstChild as HTMLElement;
    
    fireEvent.mouseMove(card, {
      clientX: 100,
      clientY: 100,
      currentTarget: {
        getBoundingClientRect: () => ({
          left: 0,
          top: 0,
          width: 200,
          height: 200,
        }),
      },
    });

    // Just verify it doesn't throw
    expect(card).toBeInTheDocument();
  });
});
