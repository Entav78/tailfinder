import { useAuthStore } from '@/store/authStore';
import { useAdoptionRequestStore } from '@/store/adoptionRequestStore';
import { Button } from '@/components/Buttons/Button';
import type { Pet } from '@/types/pet';

interface AdoptButtonProps {
  pet: Pet;
}

/**
 * Renders an "Adopt" button for pets that are not yet adopted.
 * If the user is logged in and clicks the button, an adoption request is sent.
 *
 * @component
 * @param {AdoptButtonProps} props - The pet object to check adoption status and owner.
 * @returns {JSX.Element | null} A button to send adoption request, or null if already adopted.
 */

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
    <Button variant="primary" className="w-full" onClick={handleAdopt}>
      Adopt
    </Button>
  );
};
