import { loadThemePreference } from './utils/theme';
import RevealProvider from '@/context/RevealProvider';
loadThemePreference(); // 🔥 call before React renders anything

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
