/**
 * Renders a card for a single adoption request.
 * Shows requester name and allows the owner to approve or decline the request
 * if it's still pending. Otherwise, displays the status.
 *
 * @component
 * @param {AdoptionRequest} request - The request data containing requester name and status
 * @param {(status: 'approved' | 'declined') => void} onUpdate - Callback to update the request status
 * @returns {JSX.Element} The rendered adoption request card
 */

import type { AdoptionRequest } from '@/store/adoptionRequestStore';
import { Button } from '@/components/Buttons/Button/Button';

interface Props {
  request: AdoptionRequest;
  onUpdate: (status: 'approved' | 'declined') => void;
}

const AdoptionRequestCard = ({ request, onUpdate }: Props) => {
  return (
    <div className="mt-4 p-3 border rounded bg-card dark:bg-darkCard">
      <p className="text-text-muted dark:text-text-subtle text-sm mb-1">
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
        <p className="text-sm mt-2 text-text-muted dark:text-text-subtle">
          You {request.status} this request.
        </p>
      )}
    </div>
  );
};

export default AdoptionRequestCard;
