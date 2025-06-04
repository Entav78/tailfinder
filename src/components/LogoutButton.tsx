import { useAuthStore } from '@/store/authStore';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const LogoutButton = ({ onClickDone }: { onClickDone?: () => void }) => {
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
      className="text-white hover:underline text-left"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
