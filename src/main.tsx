/**
 * Entry point of the React application.
 *
 * @remarks
 * - Applies saved theme preference before rendering.
 * - Wraps the app in `BrowserRouter` for routing and `RevealProvider` for context.
 * - Mounts the root `App` component inside `#root` element.
 */
import { loadThemePreference } from './utils/theme';
import RevealProvider from '@/context/RevealProvider';
loadThemePreference();

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <RevealProvider>
        <App />
      </RevealProvider>
    </BrowserRouter>
  </React.StrictMode>
);
