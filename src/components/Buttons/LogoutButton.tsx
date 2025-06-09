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
      className="bg-header text-white px-4 py-2 rounded hover:underline"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
