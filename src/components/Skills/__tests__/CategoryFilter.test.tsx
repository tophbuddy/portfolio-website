import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CategoryFilter from '../CategoryFilter';
import { Category } from '../../../types/Category';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  },
}));

describe('CategoryFilter', () => {
  const mockCategories: Category[] = [
    {
      id: 'frontend',
      name: 'Frontend',
      icon: '🎨',
      count: 5,
    },
    {
      id: 'backend',
      name: 'Backend',
      icon: '⚙️',
      count: 3,
    },
  ];

  it('renders all categories and "All" button', () => {
    render(
      <CategoryFilter
        categories={mockCategories}
        selectedCategoryId={null}
        onCategorySelect={() => {}}
      />
    );

    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('Frontend')).toBeInTheDocument();
    expect(screen.getByText('Backend')).toBeInTheDocument();
  });

  it('shows correct active state for selected category', () => {
    render(
      <CategoryFilter
        categories={mockCategories}
        selectedCategoryId="frontend"
        onCategorySelect={() => {}}
      />
    );

    const frontendButton = screen.getByText('Frontend').closest('button');
    const backendButton = screen.getByText('Backend').closest('button');
    const allButton = screen.getByText('All').closest('button');

    expect(frontendButton).toHaveClass('bg-primary-500');
    expect(backendButton).toHaveClass('bg-gray-100');
    expect(allButton).toHaveClass('bg-gray-100');
  });

  it('shows correct active state for "All" when no category is selected', () => {
    render(
      <CategoryFilter
        categories={mockCategories}
        selectedCategoryId={null}
        onCategorySelect={() => {}}
      />
    );

    const allButton = screen.getByText('All').closest('button');
    expect(allButton).toHaveClass('bg-primary-500');
  });

  it('calls onCategorySelect with correct category id when clicked', () => {
    const handleSelect = vi.fn();
    render(
      <CategoryFilter
        categories={mockCategories}
        selectedCategoryId={null}
        onCategorySelect={handleSelect}
      />
    );

    fireEvent.click(screen.getByText('Frontend'));
    expect(handleSelect).toHaveBeenCalledWith('frontend');
  });

  it('calls onCategorySelect with null when "All" is clicked', () => {
    const handleSelect = vi.fn();
    render(
      <CategoryFilter
        categories={mockCategories}
        selectedCategoryId="frontend"
        onCategorySelect={handleSelect}
      />
    );

    fireEvent.click(screen.getByText('All'));
    expect(handleSelect).toHaveBeenCalledWith(null);
  });

  it('displays category icons when provided', () => {
    render(
      <CategoryFilter
        categories={mockCategories}
        selectedCategoryId={null}
        onCategorySelect={() => {}}
      />
    );

    const frontendIcon = screen.getByLabelText('Frontend');
    const backendIcon = screen.getByLabelText('Backend');

    expect(frontendIcon).toHaveTextContent('🎨');
    expect(backendIcon).toHaveTextContent('⚙️');
  });

  it('displays category counts when provided', () => {
    render(
      <CategoryFilter
        categories={mockCategories}
        selectedCategoryId={null}
        onCategorySelect={() => {}}
      />
    );

    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <CategoryFilter
        categories={mockCategories}
        selectedCategoryId={null}
        onCategorySelect={() => {}}
        className="custom-class"
      />
    );

    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('handles empty categories array', () => {
    render(
      <CategoryFilter
        categories={[]}
        selectedCategoryId={null}
        onCategorySelect={() => {}}
      />
    );

    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.queryByRole('button')).toBeInTheDocument();
    expect(screen.getAllByRole('button')).toHaveLength(1);
  });
});
