import { useState } from 'react';
import { RevealContext } from './RevealContext';
import type { ReactNode } from 'react';

interface RevealProviderProps {
  children: ReactNode;
  revealImages?: boolean;
}

const RevealProvider = ({
  children,
  revealImages = false,
}: RevealProviderProps) => {
  const [reveal, setReveal] = useState(revealImages);

  return (
    <RevealContext.Provider
      value={{ revealImages: reveal, setRevealImages: setReveal }}
    >
      {children}
    </RevealContext.Provider>
  );
};

export default RevealProvider;
