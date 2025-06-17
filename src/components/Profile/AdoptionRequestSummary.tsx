/**
 * @component AdoptionRequestSummary
 * Displays a summary of how many adoption requests a pet has received.
 * If there are no requests, it renders nothing.
 */

import type { Pet } from '@/types/pet';
import type { AdoptionRequest } from '@/store/adoptionRequestStore';

interface Props {
  pet: Pet;
  requests: AdoptionRequest[];
}

const AdoptionRequestSummary = ({ pet, requests }: Props) => {
  const count = requests.filter((r) => r.petId === pet.id).length;

  if (count === 0) return null;

  return (
    <p
      className="text-text-muted dark:text-text-subtle
 mt-1"
    >
      {count} adoption request{count > 1 && 's'}
    </p>
  );
};

export default AdoptionRequestSummary;
