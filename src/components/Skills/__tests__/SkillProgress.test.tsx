import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SkillProgress from '../SkillProgress';
import { Skill } from '../../../types/Skill';

// Mock dependencies
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

vi.mock('../../../data/skillIcons', () => ({
  getSkillIcon: () => ({
    icon: () => <svg data-testid="mock-icon" />,
    color: {
      light: '#000000',
      dark: '#FFFFFF',
    },
  }),
}));

describe('SkillProgress', () => {
  const mockSkill: Skill = {
    id: 'react',
    name: 'React',
    categoryId: 'frontend',
    icon: 'react',
    level: 'advanced',
    yearsOfExperience: 3,
    featured: true,
    description: 'Frontend development with React',
    certifications: [
      {
        name: 'React Certification',
        issuer: 'Test Issuer',
        date: '2023',
        url: 'https://test.com',
      },
    ],
  };

  it('renders skill name and icon', () => {
    render(<SkillProgress skill={mockSkill} />);
    
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
  });

  it('shows years of experience when enabled', () => {
    render(<SkillProgress skill={mockSkill} showYears />);
    expect(screen.getByText('3 years')).toBeInTheDocument();
  });

  it('hides years of experience when disabled', () => {
    render(<SkillProgress skill={mockSkill} showYears={false} />);
    expect(screen.queryByText('3 years')).not.toBeInTheDocument();
  });

  it('shows skill level when enabled', () => {
    render(<SkillProgress skill={mockSkill} showLevel />);
    expect(screen.getByText('Advanced')).toBeInTheDocument();
  });

  it('hides skill level when disabled', () => {
    render(<SkillProgress skill={mockSkill} showLevel={false} />);
    expect(screen.queryByText('Advanced')).not.toBeInTheDocument();
  });

  it('displays skill description when provided', () => {
    render(<SkillProgress skill={mockSkill} />);
    expect(screen.getByText('Frontend development with React')).toBeInTheDocument();
  });

  it('renders certifications with links', () => {
    render(<SkillProgress skill={mockSkill} />);
    
    const certLink = screen.getByText('React Certification');
    expect(certLink).toBeInTheDocument();
    expect(certLink.closest('a')).toHaveAttribute('href', 'https://test.com');
    expect(certLink.closest('a')).toHaveAttribute('target', '_blank');
    expect(certLink.closest('a')).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('applies custom className', () => {
    render(<SkillProgress skill={mockSkill} className="custom-class" />);
    const container = screen.getByText('React').closest('div');
    expect(container?.parentElement).toHaveClass('custom-class');
  });

  it('handles skill without certifications', () => {
    const skillWithoutCerts = { ...mockSkill, certifications: undefined };
    render(<SkillProgress skill={skillWithoutCerts} />);
    expect(screen.queryByText('React Certification')).not.toBeInTheDocument();
  });

  it('handles skill without description', () => {
    const skillWithoutDesc = { ...mockSkill, description: undefined };
    render(<SkillProgress skill={skillWithoutDesc} />);
    expect(screen.queryByText('Frontend development with React')).not.toBeInTheDocument();
  });
});
