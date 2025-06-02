export function toggleTheme() {
  const html = document.documentElement;
  const isDark = html.classList.contains('dark');
  const next = isDark ? 'light' : 'dark';
  html.classList.toggle('dark');
  localStorage.setItem('theme', next);
}

export function loadThemePreference() {
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}
