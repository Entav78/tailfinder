/**
 * @component YourPetCard
 * Displays a card for one of the logged-in user's pets, showing its details and any adoption requests received.
 *
 * Fetches the latest pet data if it's missing and conditionally renders an Edit button or Adopted badge
 * based on ownership and adoption status. Each card also displays a summary and individual adoption requests.
 *
 * @param {Pet} pet - The pet to display.
 * @param {AdoptionRequest[]} requests - All adoption requests in the system.
 * @param {(petId: string, requesterName: string, status: 'approved' | 'declined') => void} handleUpdate
 * Function called when the owner approves or declines a request.
 *
 * @returns {JSX.Element | null} A card displaying pet information and adoption requests, or nothing if the pet is missing.
 */

import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { usePetStore } from '@/store/petStore';
import { isOwner } from '@/types/pet';
import type { Pet } from '@/types/pet';
import type { AdoptionRequest } from '@/store/adoptionRequestStore';
import AdoptionRequestSummary from './AdoptionRequestSummary';
import AdoptionRequestCard from './AdoptionRequestCard';
import { EditButton } from '@/components/Buttons/EditButton';
import { AdoptedBadge } from '@/components/AdoptedBadge';
import { Link } from 'react-router-dom';

interface Props {
  pet: Pet;
  requests: AdoptionRequest[];
  handleUpdate: (
    petId: string,
    requesterName: string,
    status: 'approved' | 'declined'
  ) => void;
}

const YourPetCard = ({ pet, requests, handleUpdate }: Props) => {
  const fetchPets = usePetStore((state) => state.fetchPets);
  const updatedPet = usePetStore((state) =>
    state.pets.find((p) => p.id === pet.id)
  );
  const currentUser = useAuthStore((state) => state.user?.name);

  // Hent oppdatert liste om vi mangler dyret
  useEffect(() => {
    if (!updatedPet) {
      fetchPets();
    }
  }, [updatedPet, fetchPets]);

  // Ikke prøv å rendere hvis vi fortsatt ikke har oppdatert dyret
  if (!updatedPet) return null;

  const petRequests = requests.filter((r) => r.petId === updatedPet.id);
  const ownerCheck = isOwner(updatedPet, currentUser);

  return (
    <div
      className={`p-4 bg-card dark:bg-darkCard rounded shadow flex gap-4 items-start ${
        updatedPet.adoptionStatus === 'Adopted' ? 'opacity-96' : ''
      }`}
    >
      {updatedPet.image?.url && (
        <img
          src={updatedPet.image.url}
          alt={updatedPet.image.alt || updatedPet.name}
          className="w-16 h-16 object-cover rounded"
        />
      )}

      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <Link
              to={`/pets/${updatedPet.id}`}
              className="font-semibold text-lg text-text-base dark:text-text-base-dark hover:underline"
            >
              {updatedPet.name}
            </Link>

            <p className="text-sm text-text-muted dark:text-text-subtle">
              {updatedPet.breed !== 'Unknown' ? updatedPet.breed : ''}
            </p>
            <AdoptionRequestSummary pet={updatedPet} requests={requests} />
          </div>

          {ownerCheck && (
            <EditButton
              petId={updatedPet.id}
              adoptionStatus={updatedPet.adoptionStatus}
              ownerCheck={ownerCheck}
              className="ml-4"
            />
          )}

          {updatedPet.adoptionStatus === 'Adopted' && (
            <AdoptedBadge className="mt-2" />
          )}
        </div>

        {/* Historikk over adopsjonsforespørsler */}
        <div className="mt-4 space-y-2">
          {petRequests.map((r) => (
            <AdoptionRequestCard
              key={r.requesterName}
              request={r}
              onUpdate={(status) =>
                handleUpdate(updatedPet.id, r.requesterName, status)
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default YourPetCard;
