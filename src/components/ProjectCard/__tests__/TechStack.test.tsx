import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TechStack from '../TechStack';
import { Technology } from '../../../types/Project';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

// Mock Tag component
vi.mock('../../ui', () => ({
  Tag: ({ label, onClick }: any) => (
    <span onClick={onClick} data-testid={`tag-${label}`}>
      {label}
    </span>
  ),
}));

describe('TechStack', () => {
  const mockTechnologies: Technology[] = [
    {
      name: 'React',
      type: 'framework',
      description: 'A JavaScript library for building user interfaces',
      icon: '/icons/react.svg',
    },
    {
      name: 'TypeScript',
      type: 'language',
      description: 'JavaScript with syntax for types',
    },
    {
      name: 'MongoDB',
      type: 'database',
      description: 'NoSQL database',
    },
  ];

  it('renders all technologies', () => {
    render(<TechStack technologies={mockTechnologies} />);
    
    mockTechnologies.forEach(tech => {
      expect(screen.getByTestId(`tag-${tech.name}`)).toBeInTheDocument();
    });
  });

  it('handles tech click events', () => {
    const handleTechClick = vi.fn();
    render(
      <TechStack
        technologies={mockTechnologies}
        onTechClick={handleTechClick}
      />
    );

    fireEvent.click(screen.getByTestId('tag-React'));
    expect(handleTechClick).toHaveBeenCalledWith(mockTechnologies[0]);
  });

  it('applies featured styles', () => {
    const { container } = render(
      <TechStack
        technologies={mockTechnologies}
        featured={true}
      />
    );
    
    expect(container.firstChild).toHaveClass('flex', 'flex-wrap', 'gap-2');
  });

  it('applies custom className', () => {
    const { container } = render(
      <TechStack
        technologies={mockTechnologies}
        className="custom-class"
      />
    );
    
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('renders empty when no technologies provided', () => {
    const { container } = render(<TechStack technologies={[]} />);
    expect(container.firstChild).toBeEmptyDOMElement();
  });

  it('handles technologies without type or description', () => {
    const minimalTech: Technology[] = [
      { name: 'Test' },
    ];

    render(<TechStack technologies={minimalTech} />);
    expect(screen.getByTestId('tag-Test')).toBeInTheDocument();
  });
});
