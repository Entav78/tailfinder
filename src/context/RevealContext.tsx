import { createContext } from 'react';

interface RevealContextValue {
  revealImages: boolean;
  setRevealImages: (value: boolean) => void;
}

export const RevealContext = createContext<RevealContextValue | undefined>(
  undefined
);
