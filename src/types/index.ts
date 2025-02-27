import { ReactNode } from 'react';

export interface Project {
  id: string;
  title: string;
  summary: string;
  description: string;
  images: ProjectImage[];
  technologies: Technology[];
  links: ProjectLink[];
  date: string;
  category: string;
  featured?: boolean;
}

export interface ProjectImage {
  src: string;
  alt: string;
  featured?: boolean;
}

export interface Technology {
  name: string;
  type: string;
  color?: string;
  icon?: string;
  description?: string;
}

export interface ProjectLink {
  type: 'github' | 'demo' | 'docs' | string;
  url: string;
  label: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  summary: string;
  content: string;
  tags: string[];
  readingTime: string;
}

export interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  description: string[];
  technologies: string[];
  logo?: string;
}

export interface Skill {
  name: string;
  level: number;
  category: string;
  icon?: string;
}

export interface Category {
  name: string;
  count: number;
}

export interface BaseProps {
  className?: string;
  children?: ReactNode;
}

export interface AnimationProps extends BaseProps {
  delay?: number;
  duration?: number;
  initialScale?: number;
  finalScale?: number;
}

export interface IconProps extends BaseProps {
  size?: number | string;
  color?: string;
}

export interface TagProps extends BaseProps {
  label: string;
  color?: string;
  onClick?: () => void;
}

export interface TooltipProps extends BaseProps {
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export interface ProgressBarProps extends BaseProps {
  value: number;
  max?: number;
  color?: string;
  showLabel?: boolean;
}

export interface FilterProps<T> extends BaseProps {
  items: T[];
  selectedItem?: T;
  onSelect: (item: T) => void;
}

export interface GridProps<T> extends BaseProps {
  items: T[];
  renderItem: (item: T) => ReactNode;
  columns?: number;
  gap?: number;
}
