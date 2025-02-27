import { render } from '@testing-library/react';
import TimelineContainer from '../TimelineContainer';

describe('TimelineContainer', () => {
  it('renders children correctly', () => {
    const { getByText } = render(
      <TimelineContainer>
        <div>Test Content</div>
      </TimelineContainer>
    );
    expect(getByText('Test Content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <TimelineContainer className="custom-class">
        <div>Test Content</div>
      </TimelineContainer>
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('renders with default styles', () => {
    const { container } = render(
      <TimelineContainer>
        <div>Test Content</div>
      </TimelineContainer>
    );
    expect(container.firstChild).toHaveClass('relative');
  });
});
