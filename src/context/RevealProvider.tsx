import { useState } from 'react';
import type { ReactNode } from 'react';
import { RevealContext } from './RevealContext';

interface RevealProviderProps {
  children: ReactNode;
  initialReveal?: boolean;
}

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
