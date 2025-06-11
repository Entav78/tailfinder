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
      <p className="text-sm text-gray-500">{pet.breed}</p>
      {requestCount > 0 && (
        <p className="text-xs text-gray-500 mt-1">
          {requestCount} adoption request{requestCount > 1 && 's'}
        </p>
      )}
    </div>
  );
};
