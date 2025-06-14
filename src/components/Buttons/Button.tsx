import React from 'react';
import classNames from 'classnames';

// 1. ✨ Definer hvilke varianter som er tillatt
type ButtonVariant = 'primary' | 'secondary' | 'reveal' | 'form';

// 2. ✨ Lag en egen interface for props
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  isLoading?: boolean;
}

// 3. ✅ Lag knappekomponenten
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
  text-white 
  font-medium 
  transition-colors 
  duration-300
`;

  const variantStyles = {
    primary: `
        bg-primary 
        hover:bg-primary-hover 
        text-white
      `,
    secondary: `
        bg-secondary 
        hover:bg-secondary-hover 
        text-white 
        text-text-button-light
      `,
    reveal: `
        bg-reveal 
        hover:bg-reveal-hover 
        text-black
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
