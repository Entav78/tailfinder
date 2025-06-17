import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';

/**
 * Props for the ProtectedRoute component.
 * @property {React.ReactNode} children - The component(s) to render if the user is authenticated.
 */
interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * A wrapper component that restricts access to its children based on authentication status.
 * If the user is not logged in, it redirects them to the login page.
 *
 * @component
 * @param {ProtectedRouteProps} props - The props including children components to protect.
 * @returns {JSX.Element} The protected content or a redirect to the login page.
 */
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn());

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
