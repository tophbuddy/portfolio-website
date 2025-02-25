import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProgressBar from '../ProgressBar';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  useAnimation: () => ({
    start: vi.fn(),
    stop: vi.fn(),
  }),
}));

// Mock react-intersection-observer
vi.mock('react-intersection-observer', () => ({
  useInView: () => [null, true],
}));

describe('ProgressBar', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders with default props', () => {
    render(<ProgressBar value={50} />);
    const progressBar = screen.getByRole('generic');
    expect(progressBar).toBeInTheDocument();
  });

  it('displays correct label and value', () => {
    render(
      <ProgressBar
        value={75}
        label="Skill Level"
        showValue={true}
      />
    );

    expect(screen.getByText('Skill Level')).toBeInTheDocument();
    expect(screen.getByText('75%')).toBeInTheDocument();
  });

  it('displays secondary label when provided', () => {
    render(
      <ProgressBar
        value={60}
        secondaryLabel="Advanced"
      />
    );

    expect(screen.getByText('Advanced')).toBeInTheDocument();
  });

  it('clamps value between 0 and 100', () => {
    const { rerender } = render(<ProgressBar value={150} showValue />);
    expect(screen.getByText('100%')).toBeInTheDocument();

    rerender(<ProgressBar value={-50} showValue />);
    expect(screen.getByText('0%')).toBeInTheDocument();
  });

  it('applies custom height', () => {
    render(<ProgressBar value={50} height={16} />);
    const container = screen.getByRole('generic').firstChild as HTMLElement;
    expect(container).toHaveStyle({ height: '16px' });
  });

  it('applies custom colors', () => {
    const color = {
      light: '#FF0000',
      dark: '#00FF00',
    };

    render(<ProgressBar value={50} color={color} />);
    const progressBar = screen.getByRole('generic').querySelector('div > div') as HTMLElement;
    expect(progressBar).toHaveStyle({ backgroundColor: color.light });
  });

  it('applies custom background color', () => {
    const backgroundColor = '#CCCCCC';
    render(<ProgressBar value={50} backgroundColor={backgroundColor} />);
    const container = screen.getByRole('generic').firstChild as HTMLElement;
    expect(container).toHaveStyle({ backgroundColor });
  });

  it('applies custom className', () => {
    render(<ProgressBar value={50} className="custom-class" />);
    const container = screen.getByRole('generic');
    expect(container).toHaveClass('custom-class');
  });

  it('handles zero value correctly', () => {
    render(<ProgressBar value={0} showValue />);
    expect(screen.getByText('0%')).toBeInTheDocument();
  });

  it('handles custom max value', () => {
    render(<ProgressBar value={5} max={10} showValue />);
    expect(screen.getByText('50%')).toBeInTheDocument();
  });

  it('renders without animation when animateOnScroll is false', () => {
    render(<ProgressBar value={50} animateOnScroll={false} />);
    const progressBar = screen.getByRole('generic').querySelector('div > div') as HTMLElement;
    expect(progressBar).toHaveAttribute('data-animate', 'visible');
  });
});
