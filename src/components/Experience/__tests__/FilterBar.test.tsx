import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FilterBar from '../FilterBar';
import { ExperienceCategory } from '../../../types/ExperienceCategory';

describe('FilterBar', () => {
  const mockToggleCategory = jest.fn();

  beforeEach(() => {
    mockToggleCategory.mockClear();
  });

  it('renders all category buttons', () => {
    render(
      <FilterBar
        activeCategories={[ExperienceCategory.FULL_TIME]}
        onToggleCategory={mockToggleCategory}
      />
    );

    // Check for all category labels
    expect(screen.getByText('Full-time')).toBeInTheDocument();
    expect(screen.getByText('Contract')).toBeInTheDocument();
    expect(screen.getByText('Freelance')).toBeInTheDocument();
  });

  it('shows active state for selected categories', () => {
    render(
      <FilterBar
        activeCategories={[ExperienceCategory.FULL_TIME]}
        onToggleCategory={mockToggleCategory}
      />
    );

    const activeButton = screen.getByText('Full-time');
    expect(activeButton).toHaveTextContent('Active');
  });

  it('disables button when its the last active category', () => {
    render(
      <FilterBar
        activeCategories={[ExperienceCategory.FULL_TIME]}
        onToggleCategory={mockToggleCategory}
      />
    );

    const button = screen.getByText('Full-time');
    expect(button).toBeDisabled();
  });

  it('calls onToggleCategory when a category is clicked', () => {
    render(
      <FilterBar
        activeCategories={[ExperienceCategory.FULL_TIME, ExperienceCategory.CONTRACT]}
        onToggleCategory={mockToggleCategory}
      />
    );

    fireEvent.click(screen.getByText('Contract'));
    expect(mockToggleCategory).toHaveBeenCalledWith(ExperienceCategory.CONTRACT);
  });

  it('shows correct summary text when all categories are active', () => {
    render(
      <FilterBar
        activeCategories={Object.values(ExperienceCategory)}
        onToggleCategory={mockToggleCategory}
      />
    );

    expect(screen.getByText('Showing all experience types')).toBeInTheDocument();
  });

  it('shows correct summary text when some categories are active', () => {
    render(
      <FilterBar
        activeCategories={[ExperienceCategory.FULL_TIME]}
        onToggleCategory={mockToggleCategory}
      />
    );

    expect(screen.getByText('Showing 1 of 3 types')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <FilterBar
        activeCategories={[ExperienceCategory.FULL_TIME]}
        onToggleCategory={mockToggleCategory}
        className="custom-class"
      />
    );

    expect(container.firstChild).toHaveClass('custom-class');
  });
});
