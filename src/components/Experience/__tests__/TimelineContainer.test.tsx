import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TimelineContainer from '../TimelineContainer';
import { ExperienceEntry } from '../../../types/Experience';
import { ExperienceCategory } from '../../../types/ExperienceCategory';

// Mock experiences for testing
const mockExperiences: ExperienceEntry[] = [
  {
    id: '1',
    company: 'Tech Corp',
    title: 'Software Engineer',
    startDate: '2022-01-01',
    endDate: 'Present',
    location: 'San Francisco, CA',
    category: ExperienceCategory.FULL_TIME,
    summary: 'Full-time position',
    achievements: [],
    technologies: [],
  },
  {
    id: '2',
    company: 'Freelance',
    title: 'Developer',
    startDate: '2021-01-01',
    endDate: '2021-12-31',
    location: 'Remote',
    category: ExperienceCategory.FREELANCE,
    summary: 'Freelance work',
    achievements: [],
    technologies: [],
  },
];

describe('TimelineContainer', () => {
  it('renders without crashing', () => {
    render(<TimelineContainer experiences={mockExperiences} />);
    expect(screen.getByText('Tech Corp - Software Engineer')).toBeInTheDocument();
  });

  it('shows category filters by default', () => {
    render(<TimelineContainer experiences={mockExperiences} />);
    expect(screen.getByText('Filter by Category')).toBeInTheDocument();
  });

  it('hides category filters when showFilters is false', () => {
    render(<TimelineContainer experiences={mockExperiences} showFilters={false} />);
    expect(screen.queryByText('Filter by Category')).not.toBeInTheDocument();
  });

  it('filters experiences when category is toggled', () => {
    render(<TimelineContainer experiences={mockExperiences} />);
    
    // Initially both experiences should be visible
    expect(screen.getByText('Tech Corp - Software Engineer')).toBeInTheDocument();
    expect(screen.getByText('Freelance - Developer')).toBeInTheDocument();

    // Click the Freelance filter to deactivate it
    fireEvent.click(screen.getByText('Freelance'));

    // Only full-time experience should be visible
    expect(screen.getByText('Tech Corp - Software Engineer')).toBeInTheDocument();
    expect(screen.queryByText('Freelance - Developer')).not.toBeInTheDocument();
  });

  it('shows empty state when no experiences match filters', () => {
    render(<TimelineContainer experiences={[]} />);
    expect(screen.getByText('No experiences found for the selected categories.')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <TimelineContainer experiences={mockExperiences} className="custom-class" />
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('prevents deselecting last active category', () => {
    render(<TimelineContainer experiences={mockExperiences} />);
    
    // Try to deselect all categories
    fireEvent.click(screen.getByText('Full-time'));
    fireEvent.click(screen.getByText('Freelance'));
    fireEvent.click(screen.getByText('Contract'));
    // ... click all category filters
    
    // Should still show at least one experience
    expect(screen.getByText(/Tech Corp|Freelance/)).toBeInTheDocument();
  });
});
