import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import InteractiveIconGrid from '../InteractiveIconGrid';
import { Skill } from '../../../types/Skill';

// Mock dependencies
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    line: ({ children, ...props }: any) => <line {...props}>{children}</line>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
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

vi.mock('../../ui/Tooltip', () => ({
  default: ({ children, content }: any) => (
    <div data-testid="tooltip">
      {children}
      <div data-testid="tooltip-content">{content}</div>
    </div>
  ),
}));

describe('InteractiveIconGrid', () => {
  const mockSkills: Skill[] = [
    {
      id: 'react',
      name: 'React',
      categoryId: 'frontend',
      icon: 'react',
      level: 'advanced',
      yearsOfExperience: 3,
      featured: true,
      relatedSkillIds: ['typescript'],
    },
    {
      id: 'typescript',
      name: 'TypeScript',
      categoryId: 'frontend',
      icon: 'typescript',
      level: 'expert',
      yearsOfExperience: 4,
      featured: true,
      relatedSkillIds: ['react'],
    },
  ];

  it('renders all skills', () => {
    render(<InteractiveIconGrid skills={mockSkills} />);
    
    expect(screen.getByTestId('icon-react')).toBeInTheDocument();
    expect(screen.getByTestId('icon-typescript')).toBeInTheDocument();
  });

  it('shows tooltips when enabled', () => {
    render(<InteractiveIconGrid skills={mockSkills} showTooltips />);
    
    const tooltips = screen.getAllByTestId('tooltip');
    expect(tooltips).toHaveLength(2);
  });

  it('hides tooltips when disabled', () => {
    render(<InteractiveIconGrid skills={mockSkills} showTooltips={false} />);
    
    expect(screen.queryByTestId('tooltip')).not.toBeInTheDocument();
  });

  it('calls onSkillClick when skill is clicked', () => {
    const onSkillClick = vi.fn();
    render(
      <InteractiveIconGrid
        skills={mockSkills}
        onSkillClick={onSkillClick}
      />
    );
    
    fireEvent.click(screen.getByTestId('icon-react'));
    expect(onSkillClick).toHaveBeenCalledWith(mockSkills[0]);
  });

  it('calls onSkillHover when skill is hovered', () => {
    const onSkillHover = vi.fn();
    render(
      <InteractiveIconGrid
        skills={mockSkills}
        onSkillHover={onSkillHover}
      />
    );
    
    const skill = screen.getByTestId('icon-react').parentElement;
    if (skill) {
      fireEvent.mouseEnter(skill);
      expect(onSkillHover).toHaveBeenCalledWith(mockSkills[0]);

      fireEvent.mouseLeave(skill);
      expect(onSkillHover).toHaveBeenCalledWith(null);
    }
  });

  it('applies custom grid columns', () => {
    const { container } = render(
      <InteractiveIconGrid
        skills={mockSkills}
        mobileColumns={2}
        tabletColumns={3}
        desktopColumns={4}
      />
    );
    
    const grid = container.querySelector('.interactive-icon-grid');
    expect(grid).toHaveClass('grid-cols-2');
    expect(grid).toHaveClass('sm:grid-cols-3');
    expect(grid).toHaveClass('lg:grid-cols-4');
  });

  it('shows connection lines when enabled', () => {
    render(
      <InteractiveIconGrid
        skills={mockSkills}
        showConnections
      />
    );
    
    const skill = screen.getByTestId('icon-react').parentElement;
    if (skill) {
      fireEvent.mouseEnter(skill);
      expect(document.querySelector('svg')).toBeInTheDocument();
    }
  });

  it('hides connection lines when disabled', () => {
    render(
      <InteractiveIconGrid
        skills={mockSkills}
        showConnections={false}
      />
    );
    
    const skill = screen.getByTestId('icon-react').parentElement;
    if (skill) {
      fireEvent.mouseEnter(skill);
      expect(document.querySelector('svg')).not.toBeInTheDocument();
    }
  });

  it('applies custom className', () => {
    const { container } = render(
      <InteractiveIconGrid
        skills={mockSkills}
        className="custom-class"
      />
    );
    
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('handles empty skills array', () => {
    render(<InteractiveIconGrid skills={[]} />);
    expect(screen.queryByTestId(/icon-/)).not.toBeInTheDocument();
  });

  it('handles missing icons gracefully', () => {
    vi.mocked(getSkillIcon).mockReturnValueOnce(undefined);
    render(<InteractiveIconGrid skills={mockSkills} />);
    
    expect(screen.queryByTestId('icon-react')).not.toBeInTheDocument();
    expect(screen.getByTestId('icon-typescript')).toBeInTheDocument();
  });
});
