import { createContext } from 'react';

interface RevealContextType {
  revealImages: boolean;
  setRevealImages: (value: boolean) => void;
}

export const RevealContext = createContext<RevealContextType | undefined>(
  undefined
);
