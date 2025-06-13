import { Button } from '@/components/Buttons/Button';
import { useNavigate } from 'react-router-dom';

interface EditButtonProps {
  petId: string;
  adoptionStatus?: string;
  ownerCheck: boolean;
}
export const EditButton = ({
  petId,
  adoptionStatus,
  ownerCheck,
}: EditButtonProps) => {
  const navigate = useNavigate();

  if (!ownerCheck || adoptionStatus?.toLowerCase() !== 'available') return null;

  return (
    <Button variant="secondary" onClick={() => navigate(`/manage/${petId}`)}>
      Edit
    </Button>
  );
};
