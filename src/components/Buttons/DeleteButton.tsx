import { deletePet } from '@/api/pets/deletePet';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/Buttons/Button';

interface DeleteButtonProps {
  /**
   * ID of the pet to be deleted.
   */
  petId: string;
  /**
   * Optional callback function called after successful deletion.
   */
  onDeleted?: () => void;
}

/**
 * A button component that deletes a pet when clicked.
 *
 * @component
 * @param {DeleteButtonProps} props - Props including petId and an optional onDeleted callback.
 * @returns {JSX.Element} A styled "Delete" button.
 */
export const DeleteButton = ({ petId, onDeleted }: DeleteButtonProps) => {
  const accessToken = useAuthStore((state) => state.accessToken);

  const handleDelete = async () => {
    if (!accessToken) return;
    const confirmed = window.confirm(
      'Are you sure you want to delete this pet?'
    );
    if (!confirmed) return;

    try {
      if (!accessToken) return;
      await deletePet(petId, accessToken);

      alert('Pet deleted!');
      if (onDeleted) onDeleted();
    } catch (error) {
      console.error(error);
      alert('Failed to delete pet');
    }
  };

  return (
    <Button variant="reveal" onClick={handleDelete}>
      Delete
    </Button>
  );
};
