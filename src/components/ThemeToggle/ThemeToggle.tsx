import { useEffect, useState } from 'react';

interface ThemeToggleProps {
  onClickDone?: () => void;
}

/**
 * @component ThemeToggle
 * A button that toggles between light and dark themes.
 *
 * - Retrieves and applies the saved theme from localStorage on mount
 * - Updates the HTML root class to reflect the current theme
 * - Persists the updated theme back to localStorage
 *
 * @param {ThemeToggleProps} props - The props for the component
 * @param {() => void} [props.onClickDone] - Optional callback triggered after the theme is toggled
 * @returns {JSX.Element} A button that toggles the site theme
 */

export function ThemeToggle({ onClickDone }: ThemeToggleProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const saved = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const initial = saved ?? 'light';
    setTheme(initial);
    document.documentElement.classList.remove('dark');
    if (initial === 'dark') document.documentElement.classList.add('dark');
  }, []);

  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.classList.remove('dark');
    if (next === 'dark') document.documentElement.classList.add('dark');
    localStorage.setItem('theme', next);
    setTheme(next);

    if (onClickDone) onClickDone();
  }

  return (
    <button
      onClick={toggleTheme}
      className="hover:underline text-sm sm:text-base whitespace-nowrap"
    >
      Theme Toggle
    </button>
  );
}
