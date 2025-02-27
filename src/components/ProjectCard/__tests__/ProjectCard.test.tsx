import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import '@testing-library/jest-dom';
import ProjectCard from '../ProjectCard';
import { Project, Technology } from '../../../types/Project';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    article: ({ children, ...props }: any) => <article {...props}>{children}</article>,
  },
  useMotionTemplate: (strings: TemplateStringsArray, ...values: any[]) => '',
  useMotionValue: () => ({ set: vi.fn() }),
}));

// Mock child components
vi.mock('../ProjectImage', () => ({
  default: ({ images, title }: { images: any[]; title: string }) => (
    <div data-testid="project-image">
      {images[0].src}
      {title}
    </div>
  ),
}));

vi.mock('../ProjectContent', () => ({
  default: ({ project }: { project: Project }) => (
    <div data-testid="project-content">
      {project.title}
      {project.summary}
    </div>
  ),
}));

vi.mock('../TechStack', () => ({
  default: ({ technologies }: { technologies: Technology[] }) => (
    <div data-testid="tech-stack">
      {technologies.map(tech => tech.name).join(', ')}
    </div>
  ),
}));

vi.mock('../ProjectLinks', () => ({
  default: ({ links }: { links: Project['links'] }) => (
    <div data-testid="project-links">
      {links.map(link => (
        <a key={link.url} href={link.url}>
          {link.label}
        </a>
      ))}
    </div>
  ),
}));

const mockProject: Project = {
  id: '1',
  title: 'Test Project',
  summary: 'A test project summary',
  description: 'A test project description',
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
  date: '2025-02-26',
  category: 'Web',
  featured: true,
};

describe('ProjectCard', () => {
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

  it('applies custom className', () => {
    const { container } = render(
      <ProjectCard project={mockProject} className="custom-class" />
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('renders with default styles', () => {
    const { container } = render(<ProjectCard project={mockProject} />);
    expect(container.firstChild).toHaveClass('bg-white', 'dark:bg-gray-900');
  });
});
