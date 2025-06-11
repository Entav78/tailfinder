import type { AdoptionRequest } from '@/store/adoptionRequestStore';
import { Button } from '@/components/Buttons/Button';

interface Props {
  request: AdoptionRequest;
  onUpdate: (status: 'approved' | 'declined') => void;
}

const AdoptionRequestCard = ({ request, onUpdate }: Props) => {
  return (
    <div className="mt-4 p-3 border rounded bg-gray-50 dark:bg-gray-700">
      <p className="text-sm mb-1">
        <strong>{request.requesterName}</strong> wants to adopt this pet.
      </p>
      {request.status === 'pending' ? (
        <div className="flex gap-2">
          <Button variant="primary" onClick={() => onUpdate('approved')}>
            Approve
          </Button>
          <Button variant="reveal" onClick={() => onUpdate('declined')}>
            Decline
          </Button>
        </div>
      ) : (
        <p className="text-sm mt-2 text-gray-600">
          You {request.status} this request.
        </p>
      )}
    </div>
  );
};

export default AdoptionRequestCard;
