import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import '@testing-library/jest-dom';
import TechStack from '../TechStack';
import { Technology } from '../../../types/Project';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

describe('TechStack', () => {
  const mockTechnologies: Technology[] = [
    {
      name: 'React',
      type: 'framework',
      color: '#61DAFB',
    },
    {
      name: 'TypeScript',
      type: 'language',
      color: '#3178C6',
    },
    {
      name: 'Node.js',
      type: 'platform',
      color: '#339933',
    },
  ];

  it('renders all technologies', () => {
    render(<TechStack technologies={mockTechnologies} />);
    
    mockTechnologies.forEach(tech => {
      expect(screen.getByText(tech.name)).toBeInTheDocument();
    });
  });

  it('applies custom colors', () => {
    render(<TechStack technologies={mockTechnologies} />);
    
    mockTechnologies.forEach(tech => {
      const tag = screen.getByText(tech.name);
      expect(tag).toHaveStyle({ backgroundColor: tech.color });
    });
  });

  it('applies custom className', () => {
    const { container } = render(
      <TechStack technologies={mockTechnologies} className="custom-class" />
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('handles empty technologies array', () => {
    const { container } = render(<TechStack technologies={[]} />);
    expect(container.firstChild).toBeEmptyDOMElement();
  });

  it('renders with default spacing', () => {
    const { container } = render(<TechStack technologies={mockTechnologies} />);
    expect(container.firstChild).toHaveClass('space-x-2');
  });
});
