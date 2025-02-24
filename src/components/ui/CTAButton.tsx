import React from 'react';
import { Link } from 'react-router-dom';
import ButtonHoverEffect from './ButtonHoverEffect';

interface CTAButtonProps {
  children: React.ReactNode;
  to?: string;
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
  disabled?: boolean;
  hoverEffect?: 'shine' | 'glow' | 'magnetic' | 'spotlight';
}

const CTAButton: React.FC<CTAButtonProps> = ({
  children,
  to,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  icon,
  iconPosition = 'right',
  isLoading = false,
  disabled = false,
  hoverEffect = 'glow',
}) => {
  // Base styles
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-60 disabled:cursor-not-allowed';
  
  // Size styles
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  // Variant styles
  const variantStyles = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 disabled:bg-primary-300',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 active:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600',
    outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50 active:bg-primary-100 dark:border-primary-400 dark:text-primary-400 dark:hover:bg-primary-900/20',
  };

  // Loading spinner
  const LoadingSpinner = () => (
    <svg
      className="animate-spin -ml-1 mr-2 h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );

  // Get hover effect based on variant
  const getHoverEffect = () => {
    switch (variant) {
      case 'primary':
        return {
          effect: hoverEffect,
          glowColor: 'rgba(var(--color-primary-500), 0.4)',
          intensity: 1.2,
        };
      case 'secondary':
        return {
          effect: hoverEffect,
          glowColor: 'rgba(var(--color-gray-500), 0.3)',
          intensity: 1,
        };
      case 'outline':
        return {
          effect: hoverEffect,
          glowColor: 'rgba(var(--color-primary-400), 0.2)',
          intensity: 0.8,
        };
      default:
        return {
          effect: hoverEffect,
          glowColor: 'rgba(var(--color-primary-500), 0.3)',
          intensity: 1,
        };
    }
  };

  const { effect, glowColor, intensity } = getHoverEffect();

  // Button content with icon
  const ButtonContent = () => (
    <>
      {isLoading && <LoadingSpinner />}
      {!isLoading && icon && iconPosition === 'left' && (
        <span className="mr-2">{icon}</span>
      )}
      <span>{children}</span>
      {!isLoading && icon && iconPosition === 'right' && (
        <span className="ml-2">{icon}</span>
      )}
    </>
  );

  const buttonClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  // Render appropriate element based on props
  if (to) {
    return (
      <ButtonHoverEffect
        effect={effect}
        glowColor={glowColor}
        intensity={intensity}
        disabled={disabled || isLoading}
      >
        <Link
          to={to}
          className={buttonClasses}
          onClick={onClick}
        >
          <ButtonContent />
        </Link>
      </ButtonHoverEffect>
    );
  }

  if (href) {
    return (
      <ButtonHoverEffect
        effect={effect}
        glowColor={glowColor}
        intensity={intensity}
        disabled={disabled || isLoading}
      >
        <a
          href={href}
          className={buttonClasses}
          onClick={onClick}
          target="_blank"
          rel="noopener noreferrer"
        >
          <ButtonContent />
        </a>
      </ButtonHoverEffect>
    );
  }

  return (
    <ButtonHoverEffect
      effect={effect}
      glowColor={glowColor}
      intensity={intensity}
      disabled={disabled || isLoading}
    >
      <button
        className={buttonClasses}
        onClick={onClick}
        disabled={disabled || isLoading}
      >
        <ButtonContent />
      </button>
    </ButtonHoverEffect>
  );
};

export default CTAButton;
