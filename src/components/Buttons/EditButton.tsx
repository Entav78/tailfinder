import { Button } from '@/components/Buttons/Button';
import { useNavigate } from 'react-router-dom';

interface EditButtonProps {
  /**
   * ID of the pet to edit.
   */
  petId: string;
  /**
   * Current adoption status of the pet (optional).
   */
  adoptionStatus?: string;

  /**
   * Whether the current user is the owner of the pet.
   */
  ownerCheck: boolean;

  /**
   * Optional custom class name for styling.
   */
  className?: string;
}

/**
 * A button that navigates to the edit page for a pet, shown only
 * if the user is the owner and the pet is available for adoption.
 *
 * @component
 * @param {EditButtonProps} props - Props including petId, adoptionStatus, ownerCheck, and optional className.
 * @returns {JSX.Element | null} A styled "Edit" button or null if conditions aren't met.
 */
export const EditButton = ({
  petId,
  adoptionStatus,
  ownerCheck,
  className,
}: EditButtonProps) => {
  const navigate = useNavigate();

  if (!ownerCheck || adoptionStatus?.toLowerCase() !== 'available') return null;

  return (
    <Button
      variant="secondary"
      onClick={() => navigate(`/manage/${petId}`)}
      className={className}
    >
      Edit
    </Button>
  );
};
