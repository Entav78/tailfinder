import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { usePetStore } from '@/store/petStore';
import { isOwner } from '@/types/pet';
import type { Pet } from '@/types/pet';
import type { AdoptionRequest } from '@/store/adoptionRequestStore';
import AdoptionRequestSummary from './AdoptionRequestSummary';
import AdoptionRequestCard from './AdoptionRequestCard';
import { EditButton } from '@/components/Buttons/EditButton';

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
    <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
      <div className="flex justify-between items-center">
        <div>
          <p className="font-semibold text-lg">{updatedPet.name}</p>
          <p className="text-sm text-gray-500">
            {updatedPet && updatedPet.breed !== 'Unknown'
              ? updatedPet.breed
              : ''}
          </p>
          <AdoptionRequestSummary pet={updatedPet} requests={requests} />
        </div>
        <EditButton
          petId={updatedPet.id}
          adoptionStatus={updatedPet.adoptionStatus}
          ownerCheck={ownerCheck}
        />
      </div>

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
  );
};

export default YourPetCard;
