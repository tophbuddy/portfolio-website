import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import '@testing-library/jest-dom';
import ProjectLinks from '../ProjectLinks';
import { ProjectLink } from '../../../types/Project';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    a: ({ children, ...props }: any) => <a {...props}>{children}</a>,
  },
}));

describe('ProjectLinks', () => {
  const mockLinks: ProjectLink[] = [
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
  ];

  it('renders all links', () => {
    render(<ProjectLinks links={mockLinks} />);
    
    expect(screen.getByText('View Code')).toBeInTheDocument();
    expect(screen.getByText('Live Demo')).toBeInTheDocument();
  });

  it('renders correct URLs', () => {
    render(<ProjectLinks links={mockLinks} />);
    
    mockLinks.forEach(link => {
      const anchor = screen.getByText(link.label).closest('a');
      expect(anchor).toHaveAttribute('href', link.url);
    });
  });

  it('applies security attributes to links', () => {
    render(<ProjectLinks links={mockLinks} />);
    
    const links = screen.getAllByRole('link');
    links.forEach(link => {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  it('applies custom className', () => {
    const { container } = render(
      <ProjectLinks links={mockLinks} className="custom-class" />
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('applies featured styles when featured prop is true', () => {
    render(<ProjectLinks links={mockLinks} featured={true} />);
    const link = screen.getByText('View Code').closest('a');
    expect(link).toHaveClass('text-base');
  });

  it('handles empty links array', () => {
    const { container } = render(<ProjectLinks links={[]} />);
    expect(container.firstChild).toBeEmptyDOMElement();
  });
});
