/**
 * 404 Error Page Component
 *
 * @description
 * This page is displayed when the user navigates to a route that does not exist.
 * It provides a friendly message and a button to guide the user back to the homepage.
 *
 * @remarks
 * - Styled to center content vertically and horizontally with Tailwind CSS.
 * - Uses a custom `<Button />` component for consistent styling.
 * - The humorous button label ("Sniff your way back 🐽") adds personality in line with the TailFinder theme.
 * - Navigates to the homepage using `useNavigate` from `react-router-dom`.
 *
 * @returns A section element with a 404 message and a navigation button.
 */
import { Button } from '@/components/Buttons/Button/Button';
import { useNavigate } from 'react-router-dom';

function ErrorPage() {
  const navigate = useNavigate();

  return (
    <section className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <h1 className="text-3xl font-bold mb-2">404 – Page Not Found</h1>
      <p className="text-text-muted dark:text-text-subtle mb-6 max-w-md">
        Oops! Even our adoption filters can’t find this page.
      </p>

      <Button variant="form" onClick={() => navigate('/')}>
        Sniff your way back 🐽
      </Button>
    </section>
  );
}

export default ErrorPage;
