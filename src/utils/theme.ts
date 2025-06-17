/**
 * Toggles the current theme between light and dark mode.
 *
 * @remarks
 * - Updates the `<html>` element by toggling the `dark` class.
 * - Saves the next theme preference in `localStorage` under the key `"theme"`.
 */
export function toggleTheme() {
  const html = document.documentElement;
  const isDark = html.classList.contains('dark');
  const next = isDark ? 'light' : 'dark';
  html.classList.toggle('dark');
  localStorage.setItem('theme', next);
}

/**
 * Loads the user's saved theme preference from `localStorage`.
 *
 * @remarks
 * - Applies the `dark` class to the `<html>` element if the stored theme is `"dark"`.
 * - Otherwise, ensures the `dark` class is removed.
 */
export function loadThemePreference() {
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}
