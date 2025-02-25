import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
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
      url: 'https://github.com/test/repo',
      label: 'View Code',
    },
    {
      type: 'demo',
      url: 'https://demo.test',
      label: 'Live Demo',
      icon: '/icons/demo.svg',
    },
    {
      type: 'docs',
      url: 'https://docs.test',
      label: 'Documentation',
    },
  ];

  it('renders all links', () => {
    render(<ProjectLinks links={mockLinks} />);
    
    expect(screen.getByText('View Code')).toBeInTheDocument();
    expect(screen.getByText('Live Demo')).toBeInTheDocument();
    expect(screen.getByText('Documentation')).toBeInTheDocument();
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

  it('renders custom icons when provided', () => {
    render(<ProjectLinks links={mockLinks} />);
    
    const demoLink = screen.getByText('Live Demo').closest('a');
    const icon = demoLink?.querySelector('img');
    expect(icon).toHaveAttribute('src', '/icons/demo.svg');
  });

  it('renders default icons when no custom icon provided', () => {
    render(<ProjectLinks links={mockLinks} />);
    
    const githubLink = screen.getByText('View Code').closest('a');
    const svg = githubLink?.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('applies featured styles when featured prop is true', () => {
    render(<ProjectLinks links={mockLinks} featured={true} />);
    
    const link = screen.getByText('View Code').closest('a');
    expect(link).toHaveClass('text-base');
  });

  it('applies default styles when featured prop is false', () => {
    render(<ProjectLinks links={mockLinks} featured={false} />);
    
    const link = screen.getByText('View Code').closest('a');
    expect(link).toHaveClass('text-sm');
  });

  it('applies custom className', () => {
    render(<ProjectLinks links={mockLinks} className="custom-class" />);
    
    const container = screen.getByText('View Code').parentElement;
    expect(container).toHaveClass('custom-class');
  });

  it('handles empty links array', () => {
    const { container } = render(<ProjectLinks links={[]} />);
    expect(container.firstChild).toBeEmptyDOMElement();
  });
});
