import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SkillsSection from '../SkillsSection';
import { Skill } from '../../../types/Skill';
import { Category } from '../../../types/Category';

// Mock child components
vi.mock('../CategoryFilter', () => ({
  default: ({ categories, selectedCategoryId, onCategorySelect }: any) => (
    <div data-testid="category-filter">
      {categories.map((cat: any) => (
        <button
          key={cat.id}
          onClick={() => onCategorySelect(cat.id)}
          data-selected={selectedCategoryId === cat.id}
        >
          {cat.name} ({cat.count})
        </button>
      ))}
    </div>
  ),
}));

vi.mock('../MasonryGrid', () => ({
  default: ({ skills }: any) => (
    <div data-testid="masonry-grid">
      {skills.map((skill: Skill) => (
        <div key={skill.id}>{skill.name}</div>
      ))}
    </div>
  ),
}));

vi.mock('../TechnologyGrid', () => ({
  default: ({ skills }: any) => (
    <div data-testid="technology-grid">
      {skills.map((skill: Skill) => (
        <div key={skill.id}>{skill.name}</div>
      ))}
    </div>
  ),
}));

vi.mock('../SkillProgress', () => ({
  default: ({ skill }: any) => (
    <div data-testid="skill-progress">
      {skill.name}
    </div>
  ),
}));

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe('SkillsSection', () => {
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
      id: 'node',
      name: 'Node.js',
      categoryId: 'backend',
      icon: 'node',
      level: 'intermediate',
      yearsOfExperience: 2,
      featured: true,
    },
  ];

  const mockCategories: Category[] = [
    {
      id: 'frontend',
      name: 'Frontend',
      icon: '🎨',
    },
    {
      id: 'backend',
      name: 'Backend',
      icon: '⚙️',
    },
  ];

  it('renders all skills initially', () => {
    render(
      <SkillsSection
        skills={mockSkills}
        categories={mockCategories}
      />
    );
    
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Node.js')).toBeInTheDocument();
  });

  it('filters skills by category', () => {
    render(
      <SkillsSection
        skills={mockSkills}
        categories={mockCategories}
      />
    );
    
    // Click frontend category
    fireEvent.click(screen.getByText('Frontend (1)'));
    
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.queryByText('Node.js')).not.toBeInTheDocument();
  });

  it('shows correct category counts', () => {
    render(
      <SkillsSection
        skills={mockSkills}
        categories={mockCategories}
      />
    );
    
    expect(screen.getByText('Frontend (1)')).toBeInTheDocument();
    expect(screen.getByText('Backend (1)')).toBeInTheDocument();
  });

  it('toggles between compact and detailed views', () => {
    render(
      <SkillsSection
        skills={mockSkills}
        categories={mockCategories}
      />
    );
    
    // Initially shows detailed view
    expect(screen.queryByTestId('technology-grid')).not.toBeInTheDocument();
    
    // Switch to compact view
    fireEvent.click(screen.getByText('Compact'));
    expect(screen.getByTestId('technology-grid')).toBeInTheDocument();
    
    // Switch back to detailed view
    fireEvent.click(screen.getByText('Detailed'));
    expect(screen.queryByTestId('technology-grid')).not.toBeInTheDocument();
  });

  it('uses masonry layout when specified', () => {
    render(
      <SkillsSection
        skills={mockSkills}
        categories={mockCategories}
        useMasonryLayout={true}
      />
    );
    
    expect(screen.getByTestId('masonry-grid')).toBeInTheDocument();
  });

  it('shows empty state when no skills match filter', () => {
    const emptySkills: Skill[] = [];
    render(
      <SkillsSection
        skills={emptySkills}
        categories={mockCategories}
      />
    );
    
    expect(screen.getByText('No skills found in this category.')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <SkillsSection
        skills={mockSkills}
        categories={mockCategories}
        className="custom-class"
      />
    );
    
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('respects defaultCategoryId prop', () => {
    render(
      <SkillsSection
        skills={mockSkills}
        categories={mockCategories}
        defaultCategoryId="frontend"
      />
    );
    
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.queryByText('Node.js')).not.toBeInTheDocument();
  });

  it('shows detailed progress when specified', () => {
    render(
      <SkillsSection
        skills={mockSkills}
        categories={mockCategories}
        showDetailedProgress={true}
      />
    );
    
    const progressElements = screen.getAllByTestId('skill-progress');
    expect(progressElements).toHaveLength(2);
  });
});
