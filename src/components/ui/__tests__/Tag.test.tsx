import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Tag from '../Tag';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
  },
}));

describe('Tag', () => {
  it('renders with default props', () => {
    render(<Tag label="Test" />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('applies color schemes correctly', () => {
    const { rerender } = render(<Tag label="Test" color="primary" />);
    expect(screen.getByText('Test')).toHaveClass('bg-primary-100', 'text-primary-800');

    rerender(<Tag label="Test" color="secondary" />);
    expect(screen.getByText('Test')).toHaveClass('bg-secondary-100', 'text-secondary-800');
  });

  it('applies size variants correctly', () => {
    const { rerender } = render(<Tag label="Test" size="sm" />);
    expect(screen.getByText('Test')).toHaveClass('text-xs');

    rerender(<Tag label="Test" size="lg" />);
    expect(screen.getByText('Test')).toHaveClass('text-base');
  });

  it('renders with icon', () => {
    const icon = <span data-testid="test-icon">🔧</span>;
    render(<Tag label="Test" icon={icon} />);
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
  });

  it('shows tooltip when provided', () => {
    render(<Tag label="Test" tooltip="Test tooltip" />);
    expect(screen.getByText('Test')).toHaveAttribute('title', 'Test tooltip');
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    render(<Tag label="Test" onClick={handleClick} />);
    
    fireEvent.click(screen.getByText('Test'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('adds interactive classes when clickable', () => {
    render(<Tag label="Test" onClick={() => {}} />);
    expect(screen.getByText('Test')).toHaveClass('cursor-pointer');
  });

  it('applies custom className', () => {
    render(<Tag label="Test" className="custom-class" />);
    expect(screen.getByText('Test')).toHaveClass('custom-class');
  });

  it('has correct ARIA role', () => {
    const { rerender } = render(<Tag label="Test" />);
    expect(screen.getByText('Test')).toHaveAttribute('role', 'status');

    rerender(<Tag label="Test" onClick={() => {}} />);
    expect(screen.getByText('Test')).toHaveAttribute('role', 'button');
  });
});
