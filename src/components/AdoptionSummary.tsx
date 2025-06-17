/**
 * @component AdoptionSummary
 * Displays a summary of a pet's name, breed, and the number of adoption requests it has received.
 *
 * Behavior:
 * - Always shows the pet's name and breed.
 * - If the pet has at least one adoption request, it displays the request count.
 *
 * @param {Object} props - Component props
 * @param {Pet} props.pet - The pet whose information is displayed
 * @param {AdoptionRequest[]} props.requests - All adoption requests to check against the pet's ID
 *
 * @returns {JSX.Element} A summary block with name, breed, and optional request count
 */

import type { Pet } from '@/types/pet';
import type { AdoptionRequest } from '@/store/adoptionRequestStore';

interface Props {
  pet: Pet;
  requests: AdoptionRequest[];
}

export const AdoptionSummary = ({ pet, requests }: Props) => {
  const requestCount = requests.filter((r) => r.petId === pet.id).length;

  return (
    <div>
      <p className="font-semibold text-lg">{pet.name}</p>
      <p className="text-sm text-text-muted dark:text-text-subtle">
        {pet.breed}
      </p>
      {requestCount > 0 && (
        <p className="text-xs text-text-muted dark:text-text-subtle mt-1">
          {requestCount} adoption request{requestCount > 1 && 's'}
        </p>
      )}
    </div>
  );
};
