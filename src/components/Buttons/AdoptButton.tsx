import { useAuthStore } from '@/store/authStore';
import { useAdoptionRequestStore } from '@/store/adoptionRequestStore';
import { Button } from '@/components/Buttons/Button';

interface AdoptButtonProps {
  petId: string;
}

export const AdoptButton = ({ petId }: AdoptButtonProps) => {
  const user = useAuthStore((state) => state.user);
  const sendRequest = useAdoptionRequestStore((state) => state.sendRequest);

  const handleAdopt = () => {
    if (!user) return;
    sendRequest({
      petId,
      requesterName: user.name,
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
