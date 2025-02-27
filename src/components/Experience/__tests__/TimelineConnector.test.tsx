import { render } from '@testing-library/react';
import TimelineConnector from '../TimelineConnector';

describe('TimelineConnector', () => {
  it('renders with correct position classes', () => {
    const { container } = render(<TimelineConnector position="left" />);
    expect(container.firstChild).toHaveClass('left-connector');
  });

  it('renders with correct color when provided', () => {
    const { container } = render(
      <TimelineConnector position="right" color="#ff0000" />
    );
    expect(container.firstChild).toHaveStyle({ backgroundColor: '#ff0000' });
  });

  it('renders with default color when no color provided', () => {
    const { container } = render(<TimelineConnector position="left" />);
    expect(container.firstChild).toHaveClass('bg-gray-200');
  });

  it('applies custom className', () => {
    const { container } = render(
      <TimelineConnector position="left" className="custom-class" />
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
