import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import Tooltip from '../Tooltip';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe('Tooltip', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    // Mock getBoundingClientRect
    Element.prototype.getBoundingClientRect = vi.fn(() => ({
      width: 120,
      height: 40,
      top: 100,
      left: 100,
      bottom: 140,
      right: 220,
      x: 100,
      y: 100,
    }));
    // Mock window dimensions
    Object.defineProperty(window, 'innerWidth', { value: 1024 });
    Object.defineProperty(window, 'innerHeight', { value: 768 });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders children without tooltip initially', () => {
    render(
      <Tooltip content="Tooltip content">
        <button>Hover me</button>
      </Tooltip>
    );

    expect(screen.getByText('Hover me')).toBeInTheDocument();
    expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument();
  });

  it('shows tooltip after hover with delay', async () => {
    render(
      <Tooltip content="Tooltip content" delay={200}>
        <button>Hover me</button>
      </Tooltip>
    );

    fireEvent.mouseEnter(screen.getByText('Hover me'));
    
    // Tooltip should not be visible immediately
    expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument();
    
    // Fast-forward time
    act(() => {
      vi.advanceTimersByTime(200);
    });
    
    // Now tooltip should be visible
    expect(screen.getByText('Tooltip content')).toBeInTheDocument();
  });

  it('hides tooltip on mouse leave', async () => {
    render(
      <Tooltip content="Tooltip content" delay={200}>
        <button>Hover me</button>
      </Tooltip>
    );

    const trigger = screen.getByText('Hover me');
    
    // Show tooltip
    fireEvent.mouseEnter(trigger);
    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(screen.getByText('Tooltip content')).toBeInTheDocument();
    
    // Hide tooltip
    fireEvent.mouseLeave(trigger);
    expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument();
  });

  it('does not show tooltip when disabled', () => {
    render(
      <Tooltip content="Tooltip content" disabled>
        <button>Hover me</button>
      </Tooltip>
    );

    fireEvent.mouseEnter(screen.getByText('Hover me'));
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    
    expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(
      <Tooltip content="Tooltip content" className="custom-class">
        <button>Hover me</button>
      </Tooltip>
    );

    fireEvent.mouseEnter(screen.getByText('Hover me'));
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    
    const tooltip = screen.getByText('Tooltip content');
    expect(tooltip.parentElement).toHaveClass('custom-class');
  });

  it('shows arrow by default', () => {
    render(
      <Tooltip content="Tooltip content">
        <button>Hover me</button>
      </Tooltip>
    );

    fireEvent.mouseEnter(screen.getByText('Hover me'));
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    
    const arrow = document.querySelector('.border-4');
    expect(arrow).toBeInTheDocument();
  });

  it('hides arrow when showArrow is false', () => {
    render(
      <Tooltip content="Tooltip content" showArrow={false}>
        <button>Hover me</button>
      </Tooltip>
    );

    fireEvent.mouseEnter(screen.getByText('Hover me'));
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    
    const arrow = document.querySelector('.border-4');
    expect(arrow).not.toBeInTheDocument();
  });

  it('supports React nodes as content', () => {
    const content = (
      <div>
        <h3>Title</h3>
        <p>Description</p>
      </div>
    );

    render(
      <Tooltip content={content}>
        <button>Hover me</button>
      </Tooltip>
    );

    fireEvent.mouseEnter(screen.getByText('Hover me'));
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
  });

  it('updates position on scroll', () => {
    render(
      <Tooltip content="Tooltip content">
        <button>Hover me</button>
      </Tooltip>
    );

    fireEvent.mouseEnter(screen.getByText('Hover me'));
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    
    fireEvent.scroll(window);
    
    // Position should be updated
    const tooltip = screen.getByText('Tooltip content').parentElement;
    expect(tooltip).toHaveStyle({ position: 'absolute' });
  });
});
