import { useAuthStore } from '@/store/authStore';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

type LogoutButtonProps = {
  onClickDone?: () => void;
  className?: string;
};

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
