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
  const mockSkill = {
    name: 'React',
    level: 90,
    color: '#61DAFB',
  };

  it('renders skill name', () => {
    render(<AnimatedSkillBar {...mockSkill} />);
    expect(screen.getByText('React')).toBeInTheDocument();
  });

  it('renders skill level', () => {
    render(<AnimatedSkillBar {...mockSkill} />);
    expect(screen.getByText('90%')).toBeInTheDocument();
  });

  it('applies custom color', () => {
    const { container } = render(<AnimatedSkillBar {...mockSkill} />);
    const progressBar = container.querySelector('.bg-[#61DAFB]');
    expect(progressBar).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <AnimatedSkillBar {...mockSkill} className="custom-class" />
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('renders with default animation duration', () => {
    const { container } = render(<AnimatedSkillBar {...mockSkill} />);
    const progressBar = container.querySelector('.duration-1000');
    expect(progressBar).toBeInTheDocument();
  });
});
