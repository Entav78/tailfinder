import { useAuthStore } from '@/store/authStore';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

type LogoutButtonProps = {
  /**
   * Optional callback to run after logout is completed.
   */
  onClickDone?: () => void;

  /**
   * Optional custom CSS classes for the button.
   */
  className?: string;
};

/**
 * LogoutButton component that logs the user out, shows a toast message,
 * redirects to the homepage, and optionally runs a callback after logout.
 *
 * @param {LogoutButtonProps} props - Props for the LogoutButton component
 * @returns {JSX.Element}
 */
export const LogoutButton = ({
  onClickDone,
  className = '',
}: LogoutButtonProps) => {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('You have been logged out.');
    navigate('/');
    onClickDone?.();
  };

  return (
    <button
      onClick={handleLogout}
      className={`text-left hover:underline transition w-full block ${className}`}
    >
      Logout
    </button>
  );
};
