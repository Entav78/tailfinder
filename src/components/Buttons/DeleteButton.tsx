import { deletePet } from '@/api/pets/deletePet';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/Buttons/Button';

interface DeleteButtonProps {
  petId: string;
  onDeleted?: () => void; // Valgfri callback etter sletting
}

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
      if (onDeleted) onDeleted(); // f.eks. naviger bort eller fjern fra liste
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
