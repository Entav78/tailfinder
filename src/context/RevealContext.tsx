import { createContext } from 'react';

/**
 * Defines the shape of the context used to control whether pet images should be revealed.
 *
 * @interface RevealContextValue
 * @property {boolean} revealImages - Whether images are currently revealed.
 * @property {(value: boolean) => void} setRevealImages - Function to toggle image visibility.
 */
interface RevealContextValue {
  revealImages: boolean;
  setRevealImages: (value: boolean) => void;
}

/**
 * React context that provides control over image visibility in pet cards.
 * Initialized as undefined and should be used within a corresponding provider.
 *
 * @constant {React.Context<RevealContextValue | undefined>}
 */
export const RevealContext = createContext<RevealContextValue | undefined>(
  undefined
);
