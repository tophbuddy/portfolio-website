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
          {cat.name}
        </button>
      ))}
    </div>
  ),
}));

vi.mock('../MasonryGrid', () => ({
  default: ({ items }: any) => (
    <div data-testid="masonry-grid">
      {items.map((item: any) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  ),
}));

vi.mock('../TechnologyGrid', () => ({
  default: ({ skills }: any) => (
    <div data-testid="technology-grid">
      {skills.map((skill: any) => (
        <div key={skill.id}>{skill.name}</div>
      ))}
    </div>
  ),
}));

vi.mock('../InteractiveIconGrid', () => ({
  default: ({ skills, onSkillClick }: any) => (
    <div data-testid="interactive-icon-grid">
      {skills.map((skill: any) => (
        <button key={skill.id} onClick={() => onSkillClick(skill)}>
          {skill.name}
        </button>
      ))}
    </div>
  ),
}));

vi.mock('../AnimatedSkillBar', () => ({
  default: ({ label, value }: any) => (
    <div data-testid="skill-bar">
      {label}: {value}%
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
      level: 'expert',
      yearsOfExperience: 4,
      featured: true,
    },
    {
      id: 'node',
      name: 'Node.js',
      categoryId: 'backend',
      icon: 'node',
      level: 'advanced',
      yearsOfExperience: 3,
      featured: false,
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

  it('renders section title', () => {
    render(
      <SkillsSection
        skills={mockSkills}
        categories={mockCategories}
      />
    );
    
    expect(screen.getByText('Skills & Technologies')).toBeInTheDocument();
  });

  it('toggles between compact and detailed views', () => {
    render(
      <SkillsSection
        skills={mockSkills}
        categories={mockCategories}
      />
    );
    
    // Initially in detailed view
    expect(screen.getByTestId('masonry-grid')).toBeInTheDocument();
    
    // Switch to compact view
    fireEvent.click(screen.getByText('Compact'));
    expect(screen.getByTestId('interactive-icon-grid')).toBeInTheDocument();
    
    // Switch back to detailed view
    fireEvent.click(screen.getByText('Detailed'));
    expect(screen.getByTestId('masonry-grid')).toBeInTheDocument();
  });

  it('filters skills by category', () => {
    render(
      <SkillsSection
        skills={mockSkills}
        categories={mockCategories}
      />
    );
    
    // Click frontend category
    fireEvent.click(screen.getByText('Frontend'));
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.queryByText('Node.js')).not.toBeInTheDocument();
  });

  it('shows skill details modal on click in compact view', () => {
    render(
      <SkillsSection
        skills={mockSkills}
        categories={mockCategories}
      />
    );
    
    // Switch to compact view
    fireEvent.click(screen.getByText('Compact'));
    
    // Click a skill
    fireEvent.click(screen.getByText('React'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    
    // Close modal
    fireEvent.click(screen.getByText('Close'));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
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

  it('shows featured skills in skill bars', () => {
    render(
      <SkillsSection
        skills={mockSkills}
        categories={mockCategories}
      />
    );
    
    const skillBar = screen.getByTestId('skill-bar');
    expect(skillBar).toHaveTextContent('React: 95%');
  });

  it('handles empty skills array', () => {
    render(
      <SkillsSection
        skills={[]}
        categories={mockCategories}
      />
    );
    
    expect(screen.queryByTestId('masonry-grid')).toBeInTheDocument();
    expect(screen.queryByTestId('skill-bar')).not.toBeInTheDocument();
  });

  it('handles empty categories array', () => {
    render(
      <SkillsSection
        skills={mockSkills}
        categories={[]}
      />
    );
    
    expect(screen.getByTestId('category-filter')).toBeInTheDocument();
  });

  it('renders responsive layout on mobile', () => {
    global.innerWidth = 375;
    global.innerHeight = 667;
    global.dispatchEvent(new Event('resize'));

    render(
      <SkillsSection
        skills={mockSkills}
        categories={mockCategories}
      />
    );

    expect(screen.getByTestId('category-filter')).toBeInTheDocument();
    expect(screen.getByTestId('masonry-grid')).toBeInTheDocument();
  });

  it('hides category filter on mobile', () => {
    global.innerWidth = 375;
    global.innerHeight = 667;
    global.dispatchEvent(new Event('resize'));

    render(
      <SkillsSection
        skills={mockSkills}
        categories={mockCategories}
      />
    );

    expect(screen.queryByTestId('category-filter')).not.toBeInTheDocument();
  });

  it('shows category filter on desktop', () => {
    global.innerWidth = 1920;
    global.innerHeight = 1080;
    global.dispatchEvent(new Event('resize'));

    render(
      <SkillsSection
        skills={mockSkills}
        categories={mockCategories}
      />
    );

    expect(screen.getByTestId('category-filter')).toBeInTheDocument();
  });
});
