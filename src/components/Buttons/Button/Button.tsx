import React from 'react';
import classNames from 'classnames';

type ButtonVariant = 'primary' | 'secondary' | 'reveal' | 'form';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Visual variant of the button. Controls styling.
   * @default "primary"
   */
  variant?: ButtonVariant;

  /**
   * Whether the button is in a loading state.
   * @default false
   */
  isLoading?: boolean;
}

/**
 * Reusable Button component with support for multiple variants and loading state.
 *
 * @component
 * @param {ButtonProps} props - Props including children, variant, isLoading, and other HTML button attributes.
 * @returns {JSX.Element} A styled button element.
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  isLoading = false,
  className,
  disabled,
  ...props
}) => {
  const baseStyles = `
  px-4 
  py-2 
  rounded 
  font-medium 
  transition-colors 
  duration-300
`;

  const variantStyles = {
    primary: `
    bg-primary 
    hover:bg-primary-hover
    text-text-button-light
  `,
    secondary: `
    bg-secondary 
    hover:bg-secondary-hover
    text-text-base 
    border-dark
  `,
    reveal: `
    bg-reveal
    hover:bg-reveal-hover 
    text-text-button-light
  `,
    form: `
    bg-secondary 
    hover:bg-secondary-hover 
    text-inherit 
    border border-border-light 
    dark:text-text-dark 
    dark:border-border-dark
  `,
  };

  const combinedClasses = classNames(
    baseStyles,
    variantStyles[variant],
    {
      'opacity-50 cursor-not-allowed': isLoading || disabled,
    },
    className
  );

  return (
    <button
      className={combinedClasses}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? 'Laster...' : children}
      {/* {isLoading ? <Spinner /> : children} */}
    </button>
  );
};
