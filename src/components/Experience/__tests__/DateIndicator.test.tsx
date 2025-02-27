import { render, screen } from '@testing-library/react';
import DateIndicator from '../DateIndicator';

describe('DateIndicator', () => {
  it('renders formatted date', () => {
    render(
      <DateIndicator
        date="2023-01-01"
        position="left"
        type="start"
      />
    );
    expect(screen.getByText('Jan 2023')).toBeInTheDocument();
  });

  it('renders "Present" without formatting', () => {
    render(
      <DateIndicator
        date="Present"
        position="right"
        type="end"
      />
    );
    expect(screen.getByText('Present')).toBeInTheDocument();
  });

  it('shows current indicator when isCurrent is true', () => {
    const { container } = render(
      <DateIndicator
        date="Present"
        position="right"
        type="end"
        isCurrent
      />
    );
    expect(container.querySelector('.animate-ping')).toBeInTheDocument();
  });

  it('applies left position styles', () => {
    const { container } = render(
      <DateIndicator
        date="2023-01-01"
        position="left"
        type="start"
      />
    );
    expect(container.firstChild).toHaveClass('left-full');
  });

  it('applies right position styles', () => {
    const { container } = render(
      <DateIndicator
        date="2023-01-01"
        position="right"
        type="start"
      />
    );
    expect(container.firstChild).toHaveClass('right-full');
  });

  it('applies start type styles', () => {
    const { container } = render(
      <DateIndicator
        date="2023-01-01"
        position="left"
        type="start"
      />
    );
    expect(container.firstChild).toHaveClass('top-0');
  });

  it('applies end type styles', () => {
    const { container } = render(
      <DateIndicator
        date="2023-01-01"
        position="left"
        type="end"
      />
    );
    expect(container.firstChild).toHaveClass('bottom-0');
  });

  it('does not render when visible is false', () => {
    const { container } = render(
      <DateIndicator
        date="2023-01-01"
        position="left"
        type="start"
        visible={false}
      />
    );
    expect(container.firstChild).toBeNull();
  });

  it('applies custom className', () => {
    const { container } = render(
      <DateIndicator
        date="2023-01-01"
        position="left"
        type="start"
        className="custom-class"
      />
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
