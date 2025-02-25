import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AnimatedSkillBar from '../AnimatedSkillBar';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  useAnimation: () => ({
    start: vi.fn(),
  }),
  useInView: () => [null, true],
}));

describe('AnimatedSkillBar', () => {
  it('renders skill label and value', () => {
    render(
      <AnimatedSkillBar
        value={75}
        label="React"
      />
    );
    
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('75%')).toBeInTheDocument();
  });

  it('shows secondary label when provided', () => {
    render(
      <AnimatedSkillBar
        value={75}
        label="React"
        secondaryLabel="3 years"
      />
    );
    
    expect(screen.getByText('3 years')).toBeInTheDocument();
  });

  it('clamps values between 0 and 100', () => {
    const { rerender } = render(
      <AnimatedSkillBar
        value={150}
        label="Over"
      />
    );
    expect(screen.getByText('100%')).toBeInTheDocument();

    rerender(
      <AnimatedSkillBar
        value={-50}
        label="Under"
      />
    );
    expect(screen.getByText('0%')).toBeInTheDocument();
  });

  it('applies custom height', () => {
    render(
      <AnimatedSkillBar
        value={75}
        label="React"
        height={12}
      />
    );
    
    const bar = screen.getByText('React').parentElement?.nextElementSibling;
    expect(bar).toHaveStyle({ height: '12px' });
  });

  it('applies custom color', () => {
    const color = { light: '#FF0000', dark: '#CC0000' };
    render(
      <AnimatedSkillBar
        value={75}
        label="React"
        color={color}
      />
    );
    
    const progressBar = screen.getByText('React')
      .parentElement
      ?.nextElementSibling
      ?.firstElementChild;
    expect(progressBar).toHaveStyle({ backgroundColor: '#FF0000' });
  });

  it('applies custom className', () => {
    render(
      <AnimatedSkillBar
        value={75}
        label="React"
        className="custom-class"
      />
    );
    
    const container = screen.getByText('React').parentElement?.parentElement;
    expect(container).toHaveClass('custom-class');
  });

  it('shows shine effect by default', () => {
    render(
      <AnimatedSkillBar
        value={75}
        label="React"
      />
    );
    
    const shine = document.querySelector('.bg-gradient-to-r');
    expect(shine).toBeInTheDocument();
  });

  it('hides shine effect when disabled', () => {
    render(
      <AnimatedSkillBar
        value={75}
        label="React"
        showShine={false}
      />
    );
    
    const shine = document.querySelector('.bg-gradient-to-r');
    expect(shine).not.toBeInTheDocument();
  });

  it('shows pulse effect for high values', () => {
    render(
      <AnimatedSkillBar
        value={85}
        label="React"
        showPulse={true}
      />
    );
    
    const pulseElements = document.querySelectorAll('.absolute');
    expect(pulseElements.length).toBeGreaterThan(1);
  });

  it('hides pulse effect for low values', () => {
    render(
      <AnimatedSkillBar
        value={75}
        label="React"
        showPulse={true}
      />
    );
    
    const pulseElements = document.querySelectorAll('.absolute');
    expect(pulseElements.length).toBe(1);
  });

  it('hides pulse effect when disabled', () => {
    render(
      <AnimatedSkillBar
        value={85}
        label="React"
        showPulse={false}
      />
    );
    
    const pulseElements = document.querySelectorAll('.absolute');
    expect(pulseElements.length).toBe(1);
  });
});
