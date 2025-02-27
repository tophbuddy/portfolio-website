import { render, screen } from '@testing-library/react';
import ProjectContent from '../ProjectContent';
import { Project } from '../../../types/Project';

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    h3: ({ children, ...props }: any) => <h3 {...props}>{children}</h3>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
  },
}));

const mockProject: Project = {
  id: '1',
  title: 'Test Project',
  description: 'A test project description',
  technologies: ['React', 'TypeScript'],
  githubUrl: 'https://github.com/test',
  demoUrl: 'https://demo.test',
  imageUrl: '/test.jpg',
  featured: true,
};

describe('ProjectContent', () => {
  it('renders project title and description', () => {
    render(<ProjectContent project={mockProject} />);
    
    expect(screen.getByText('Test Project')).toBeInTheDocument();
    expect(screen.getByText('A test project description')).toBeInTheDocument();
  });

  it('renders technologies list', () => {
    render(<ProjectContent project={mockProject} />);
    
    mockProject.technologies.forEach(tech => {
      expect(screen.getByText(tech)).toBeInTheDocument();
    });
  });

  it('renders project links', () => {
    render(<ProjectContent project={mockProject} />);
    
    expect(screen.getByRole('link', { name: /github/i })).toHaveAttribute('href', mockProject.githubUrl);
    expect(screen.getByRole('link', { name: /live demo/i })).toHaveAttribute('href', mockProject.demoUrl);
  });

  it('applies custom className', () => {
    const { container } = render(<ProjectContent project={mockProject} className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
