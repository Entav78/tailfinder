/**
 * Entry point of the React application.
 *
 * @remarks
 * - Applies saved theme preference before rendering.
 * - Wraps the app in `BrowserRouter` for routing and `RevealProvider` for context.
 * - Mounts the root `App` component inside `#root` element.
 * - Runs `@axe-core/react` in development mode to identify accessibility issues during development.
 *
 * Accessibility testing:
 * - Axe is loaded only when `import.meta.env.DEV` is true (i.e. development mode)
 * - It reports issues in the console, including missing landmarks, color contrast, heading structure, etc.
 */
import { loadThemePreference } from './utils/theme';
import RevealProvider from '@/context/RevealProvider';
loadThemePreference();

import React from 'react';
import ReactDOM from 'react-dom/client';
import * as ReactDOMClient from 'react-dom';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';

if (import.meta.env.DEV) {
  import('@axe-core/react').then(({ default: axe }) => {
    axe(React, ReactDOMClient, 1000, {
      rules: [
        {
          id: 'color-contrast',
          enabled: true,
        },
      ],
    });
  });
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <RevealProvider>
        <App />
      </RevealProvider>
    </BrowserRouter>
  </React.StrictMode>
);
