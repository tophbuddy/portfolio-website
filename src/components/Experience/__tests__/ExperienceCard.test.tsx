import { render, screen, fireEvent } from '@testing-library/react';
import ExperienceCard from '../ExperienceCard';
import { ExperienceEntry } from '../../../types/Experience';
import { ExperienceCategory } from '../../../types/ExperienceCategory';

const mockExperience: ExperienceEntry = {
  id: '1',
  company: 'Tech Corp',
  title: 'Senior Software Engineer',
  startDate: '2022-01-01',
  endDate: 'Present',
  location: 'San Francisco, CA',
  category: ExperienceCategory.FULL_TIME,
  summary: 'Led development of key features',
  achievements: [
    { description: 'Increased performance by 50%' },
    { description: 'Led team of 5 developers' },
  ],
  technologies: [
    { id: 'react', name: 'React' },
    { id: 'typescript', name: 'TypeScript' },
  ],
};

describe('ExperienceCard', () => {
  it('renders basic experience information', () => {
    render(<ExperienceCard experience={mockExperience} position="left" />);
    
    expect(screen.getByText('Senior Software Engineer')).toBeInTheDocument();
    expect(screen.getByText('Tech Corp')).toBeInTheDocument();
    expect(screen.getByText('San Francisco, CA')).toBeInTheDocument();
  });

  it('renders category badge', () => {
    render(<ExperienceCard experience={mockExperience} position="left" />);
    expect(screen.getByText('Full-time')).toBeInTheDocument();
  });

  it('renders achievements when detailed is true', () => {
    render(<ExperienceCard experience={mockExperience} position="left" detailed />);
    
    expect(screen.getByText('Key Achievements')).toBeInTheDocument();
    expect(screen.getByText('Increased performance by 50%')).toBeInTheDocument();
    expect(screen.getByText('Led team of 5 developers')).toBeInTheDocument();
  });

  it('hides achievements when detailed is false', () => {
    render(<ExperienceCard experience={mockExperience} position="left" detailed={false} />);
    
    expect(screen.queryByText('Key Achievements')).not.toBeInTheDocument();
    expect(screen.queryByText('Increased performance by 50%')).not.toBeInTheDocument();
  });

  it('renders technologies when detailed is true', () => {
    render(<ExperienceCard experience={mockExperience} position="left" detailed />);
    
    expect(screen.getByText('Technologies Used')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(
      <ExperienceCard
        experience={mockExperience}
        position="left"
        onClick={handleClick}
      />
    );
    
    fireEvent.click(screen.getByText('Tech Corp'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders company logo when logoUrl is provided', () => {
    const experienceWithLogo = {
      ...mockExperience,
      logoUrl: 'https://example.com/logo.png',
    };
    
    render(<ExperienceCard experience={experienceWithLogo} position="left" />);
    const logo = screen.getByAltText('Tech Corp logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', 'https://example.com/logo.png');
  });

  it('applies position classes correctly', () => {
    const { container, rerender } = render(
      <ExperienceCard experience={mockExperience} position="left" />
    );
    expect(container.firstChild).not.toHaveClass('md:ml-auto');

    rerender(<ExperienceCard experience={mockExperience} position="right" />);
    expect(container.firstChild).toHaveClass('md:ml-auto');
  });

  it('applies custom className', () => {
    const { container } = render(
      <ExperienceCard
        experience={mockExperience}
        position="left"
        className="custom-class"
      />
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
