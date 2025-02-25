import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MasonryGrid from '../MasonryGrid';
import { Skill } from '../../../types/Skill';

// Mock dependencies
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

vi.mock('react-intersection-observer', () => ({
  useInView: () => [null, true],
}));

vi.mock('../../../data/skillIcons', () => ({
  getSkillIcon: (id: string) => ({
    icon: () => <div data-testid={`icon-${id}`}>Icon</div>,
    color: {
      light: '#000000',
      dark: '#FFFFFF',
    },
  }),
}));

vi.mock('../../../data/skillLevels', () => ({
  getSkillLevelProgress: (level: string) => ({
    beginner: 25,
    intermediate: 50,
    advanced: 75,
    expert: 100,
  }[level]),
  formatYearsOfExperience: (years: number) => `${years} years`,
}));

describe('MasonryGrid', () => {
  const mockSkills: Skill[] = [
    {
      id: 'react',
      name: 'React',
      categoryId: 'frontend',
      icon: 'react',
      level: 'advanced',
      yearsOfExperience: 3,
      featured: true,
      description: 'Frontend library',
      certifications: [
        {
          name: 'React Cert',
          issuer: 'Test',
          date: '2023',
          url: 'https://test.com',
        },
      ],
    },
    {
      id: 'typescript',
      name: 'TypeScript',
      categoryId: 'frontend',
      icon: 'typescript',
      level: 'expert',
      yearsOfExperience: 4,
      featured: true,
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    // Mock window resize
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });
  });

  it('renders all skills', () => {
    render(<MasonryGrid skills={mockSkills} />);
    
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('displays skill descriptions when provided', () => {
    render(<MasonryGrid skills={mockSkills} />);
    
    expect(screen.getByText('Frontend library')).toBeInTheDocument();
  });

  it('shows years of experience', () => {
    render(<MasonryGrid skills={mockSkills} />);
    
    expect(screen.getByText('3 years')).toBeInTheDocument();
    expect(screen.getByText('4 years')).toBeInTheDocument();
  });

  it('renders certifications with links', () => {
    render(<MasonryGrid skills={mockSkills} />);
    
    const certLink = screen.getByText('React Cert');
    expect(certLink.closest('a')).toHaveAttribute('href', 'https://test.com');
    expect(certLink.closest('a')).toHaveAttribute('target', '_blank');
    expect(certLink.closest('a')).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('filters skills when filter function is provided', () => {
    const filter = (skill: Skill) => skill.id === 'react';
    render(<MasonryGrid skills={mockSkills} filter={filter} />);
    
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.queryByText('TypeScript')).not.toBeInTheDocument();
  });

  it('calls onSkillClick when skill is clicked', () => {
    const onSkillClick = vi.fn();
    render(<MasonryGrid skills={mockSkills} onSkillClick={onSkillClick} />);
    
    fireEvent.click(screen.getByText('React'));
    expect(onSkillClick).toHaveBeenCalledWith(mockSkills[0]);
  });

  it('applies custom className', () => {
    const { container } = render(
      <MasonryGrid skills={mockSkills} className="custom-class" />
    );
    
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('handles empty skills array', () => {
    const { container } = render(<MasonryGrid skills={[]} />);
    const columns = container.querySelectorAll('.flex-1');
    expect(columns).toHaveLength(3); // Default desktop columns
    columns.forEach(column => expect(column).toBeEmptyDOMElement());
  });

  it('shows progress bars when showLevels is true', () => {
    render(<MasonryGrid skills={mockSkills} showLevels />);
    
    const progressBars = screen.getAllByRole('generic').filter(
      element => element.className.includes('bg-gray-100')
    );
    expect(progressBars.length).toBeGreaterThan(0);
  });

  it('hides progress bars when showLevels is false', () => {
    render(<MasonryGrid skills={mockSkills} showLevels={false} />);
    
    const progressBars = screen.queryAllByRole('generic').filter(
      element => element.className.includes('bg-gray-100')
    );
    expect(progressBars.length).toBe(0);
  });

  // Test responsive behavior
  it('adjusts columns based on screen width', () => {
    const { rerender } = render(
      <MasonryGrid
        skills={mockSkills}
        mobileColumns={1}
        tabletColumns={2}
        desktopColumns={3}
      />
    );

    // Desktop
    expect(screen.getAllByRole('generic')[0].parentElement?.children.length).toBe(3);

    // Tablet
    Object.defineProperty(window, 'innerWidth', { value: 800 });
    window.dispatchEvent(new Event('resize'));
    rerender(
      <MasonryGrid
        skills={mockSkills}
        mobileColumns={1}
        tabletColumns={2}
        desktopColumns={3}
      />
    );
    expect(screen.getAllByRole('generic')[0].parentElement?.children.length).toBe(2);

    // Mobile
    Object.defineProperty(window, 'innerWidth', { value: 400 });
    window.dispatchEvent(new Event('resize'));
    rerender(
      <MasonryGrid
        skills={mockSkills}
        mobileColumns={1}
        tabletColumns={2}
        desktopColumns={3}
      />
    );
    expect(screen.getAllByRole('generic')[0].parentElement?.children.length).toBe(1);
  });
});
