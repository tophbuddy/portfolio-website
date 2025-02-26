import React from 'react';
import { render } from '@testing-library/react';
import TimelineConnector from '../TimelineConnector';

describe('TimelineConnector', () => {
  it('renders with left position', () => {
    const { container } = render(<TimelineConnector position="left" />);
    expect(container.firstChild).toHaveClass('right-0');
  });

  it('renders with right position', () => {
    const { container } = render(<TimelineConnector position="right" />);
    expect(container.firstChild).toHaveClass('left-0');
  });

  it('applies active styles', () => {
    const { container } = render(<TimelineConnector position="left" active />);
    const dots = container.querySelectorAll('.ring-4');
    expect(dots).toHaveLength(2);
  });

  it('applies custom color', () => {
    const customColor = '#FF0000';
    const { container } = render(
      <TimelineConnector position="left" color={customColor} />
    );
    const dots = container.querySelectorAll('.rounded-full');
    dots.forEach(dot => {
      expect(dot).toHaveStyle({ backgroundColor: customColor });
    });
  });

  it('applies custom className', () => {
    const { container } = render(
      <TimelineConnector position="left" className="custom-class" />
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('renders without animation when animate is false', () => {
    const { container } = render(
      <TimelineConnector position="left" animate={false} />
    );
    const motionDivs = container.querySelectorAll('[variants]');
    expect(motionDivs).toHaveLength(0);
  });

  it('renders with animation by default', () => {
    const { container } = render(<TimelineConnector position="left" />);
    const motionDivs = container.querySelectorAll('[variants]');
    expect(motionDivs.length).toBeGreaterThan(0);
  });
});
