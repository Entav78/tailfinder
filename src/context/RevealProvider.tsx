import { useState } from 'react';
import type { ReactNode } from 'react';
import { RevealContext } from './RevealContext';

/**
 * Props for the RevealProvider component.
 *
 * @interface RevealProviderProps
 * @property {ReactNode} children - Child components that will have access to the RevealContext.
 * @property {boolean} [initialReveal=false] - Optional initial state for whether images should be revealed.
 */
interface RevealProviderProps {
  children: ReactNode;
  initialReveal?: boolean;
}

/**
 * Context provider that manages and supplies the `revealImages` state to its children.
 * Used to toggle the visibility of pet images throughout the app.
 *
 * @component
 * @param {RevealProviderProps} props - Props containing children and optional initial reveal value.
 * @returns {JSX.Element} The provider wrapping its children.
 */
const RevealProvider = ({
  children,
  initialReveal = false,
}: RevealProviderProps) => {
  const [revealImages, setRevealImages] = useState(initialReveal);

  return (
    <RevealContext.Provider value={{ revealImages, setRevealImages }}>
      {children}
    </RevealContext.Provider>
  );
};

export default RevealProvider;
