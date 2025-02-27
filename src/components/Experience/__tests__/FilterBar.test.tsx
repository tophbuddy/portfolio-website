import { render, screen, fireEvent } from '@testing-library/react';
import FilterBar from '../FilterBar';
import { ExperienceCategory } from '../../../types/ExperienceCategory';

const mockCategories = [
  ExperienceCategory.FULL_TIME,
  ExperienceCategory.CONTRACT,
  ExperienceCategory.INTERNSHIP,
];

describe('FilterBar', () => {
  const mockOnFilter = jest.fn();

  beforeEach(() => {
    mockOnFilter.mockClear();
  });

  it('renders all category buttons', () => {
    render(
      <FilterBar
        categories={mockCategories}
        selectedCategory={null}
        onFilter={mockOnFilter}
      />
    );

    mockCategories.forEach(category => {
      expect(screen.getByRole('button', { name: new RegExp(category, 'i') })).toBeInTheDocument();
    });
  });

  it('highlights selected category', () => {
    render(
      <FilterBar
        categories={mockCategories}
        selectedCategory={ExperienceCategory.FULL_TIME}
        onFilter={mockOnFilter}
      />
    );

    const selectedButton = screen.getByRole('button', { name: /full.time/i });
    expect(selectedButton).toHaveClass('bg-primary-600');
  });

  it('calls onFilter with selected category', () => {
    render(
      <FilterBar
        categories={mockCategories}
        selectedCategory={null}
        onFilter={mockOnFilter}
      />
    );

    const button = screen.getByRole('button', { name: /contract/i });
    fireEvent.click(button);

    expect(mockOnFilter).toHaveBeenCalledWith(ExperienceCategory.CONTRACT);
  });

  it('calls onFilter with null when selected category is clicked again', () => {
    render(
      <FilterBar
        categories={mockCategories}
        selectedCategory={ExperienceCategory.FULL_TIME}
        onFilter={mockOnFilter}
      />
    );

    const button = screen.getByRole('button', { name: /full.time/i });
    fireEvent.click(button);

    expect(mockOnFilter).toHaveBeenCalledWith(null);
  });
});
