import { useAuthStore } from '@/store/authStore';
import { useAdoptionRequestStore } from '@/store/adoptionRequestStore';
import { Button } from '@/components/Buttons/Button';
import type { Pet } from '@/types/pet';

interface AdoptButtonProps {
  pet: Pet;
}

export const AdoptButton = ({ pet }: AdoptButtonProps) => {
  const user = useAuthStore((state) => state.user);
  const sendRequest = useAdoptionRequestStore((state) => state.sendRequest);

  if (pet.adoptionStatus === 'Adopted') return null;

  const handleAdopt = () => {
    if (!user) return;
    sendRequest({
      petId: pet.id,
      requesterName: user.name,
      ownerName: pet.owner?.name || '',
      status: 'pending',
    });
    alert('Adoption request sent!');
  };

  return (
    <Button variant="primary" onClick={handleAdopt}>
      Adopt
    </Button>
  );
};

export default AdoptButton;
