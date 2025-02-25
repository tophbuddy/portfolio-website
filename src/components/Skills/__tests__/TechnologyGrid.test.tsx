import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TechnologyGrid from '../TechnologyGrid';
import { Skill } from '../../../types/Skill';

// Mock dependencies
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
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
}));

describe('TechnologyGrid', () => {
  const mockSkills: Skill[] = [
    {
      id: 'react',
      name: 'React',
      categoryId: 'frontend',
      icon: 'react',
      level: 'advanced',
      yearsOfExperience: 3,
      featured: true,
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

  it('renders all skills', () => {
    render(<TechnologyGrid skills={mockSkills} />);
    
    expect(screen.getByTestId('icon-react')).toBeInTheDocument();
    expect(screen.getByTestId('icon-typescript')).toBeInTheDocument();
  });

  it('applies custom grid columns', () => {
    const { container } = render(
      <TechnologyGrid
        skills={mockSkills}
        mobileColumns={2}
        tabletColumns={3}
        desktopColumns={4}
      />
    );

    const grid = container.firstChild as HTMLElement;
    expect(grid).toHaveStyle({
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    });
  });

  it('shows tooltips when enabled', () => {
    render(<TechnologyGrid skills={mockSkills} showTooltips />);
    
    const tooltips = screen.getAllByText(/React|TypeScript/);
    expect(tooltips).toHaveLength(2);
  });

  it('hides tooltips when disabled', () => {
    render(<TechnologyGrid skills={mockSkills} showTooltips={false} />);
    
    const tooltips = screen.queryAllByText(/React|TypeScript/);
    expect(tooltips).toHaveLength(0);
  });

  it('shows skill levels when enabled', () => {
    render(<TechnologyGrid skills={mockSkills} showLevels />);
    
    const tooltips = screen.getAllByText(/advanced|expert/);
    expect(tooltips).toHaveLength(2);
  });

  it('hides skill levels when disabled', () => {
    render(<TechnologyGrid skills={mockSkills} showLevels={false} />);
    
    const tooltips = screen.queryAllByText(/advanced|expert/);
    expect(tooltips).toHaveLength(0);
  });

  it('filters skills when filter function is provided', () => {
    const filter = (skill: Skill) => skill.id === 'react';
    render(<TechnologyGrid skills={mockSkills} filter={filter} />);
    
    expect(screen.getByTestId('icon-react')).toBeInTheDocument();
    expect(screen.queryByTestId('icon-typescript')).not.toBeInTheDocument();
  });

  it('calls onSkillClick when skill is clicked', () => {
    const onSkillClick = vi.fn();
    render(<TechnologyGrid skills={mockSkills} onSkillClick={onSkillClick} />);
    
    fireEvent.click(screen.getByTestId('icon-react'));
    expect(onSkillClick).toHaveBeenCalledWith(mockSkills[0]);
  });

  it('applies custom className', () => {
    const { container } = render(
      <TechnologyGrid skills={mockSkills} className="custom-class" />
    );
    
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('handles empty skills array', () => {
    const { container } = render(<TechnologyGrid skills={[]} />);
    expect(container.firstChild).toBeEmptyDOMElement();
  });

  it('handles missing icons gracefully', () => {
    vi.mocked(getSkillIcon).mockReturnValueOnce(undefined);
    render(<TechnologyGrid skills={mockSkills} />);
    
    expect(screen.queryByTestId('icon-react')).not.toBeInTheDocument();
    expect(screen.getByTestId('icon-typescript')).toBeInTheDocument();
  });
});
