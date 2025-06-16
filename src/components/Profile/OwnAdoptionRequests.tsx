import type { Pet } from '@/types/pet';
import type { AdoptionRequest } from '@/store/adoptionRequestStore';

interface Props {
  ownRequests: AdoptionRequest[];
  allPets: Pet[];
}

const OwnAdoptionRequests = ({ ownRequests, allPets }: Props) => {
  if (ownRequests.length === 0) {
    return <p>You haven’t requested to adopt any pets yet.</p>;
  }

  return (
    <div className="space-y-4">
      {ownRequests.map((r) => {
        const pet = allPets.find((p) => p.id === r.petId);
        return (
          <div
            key={`${r.petId}-${r.requesterName}`}
            className="p-4 bg-card dark:bg-darkCard border border-border-light dark:border-border-dark rounded shadow flex items-center gap-4"
          >
            {pet?.image?.url && (
              <img
                src={pet.image.url}
                alt={pet.image.alt || pet.name}
                className="w-16 h-16 object-cover rounded"
              />
            )}
            <div>
              <p className="font-semibold text-lg text-text-dark dark:text-text-base-dark">
                {pet?.name}
              </p>
              <p className="text-sm text-text-muted dark:text-text-subtle">
                {pet && pet.breed !== 'Unknown' ? pet.breed : ''}
              </p>
              <p className="text-sm mt-1 text-text-muted dark:text-text-subtle">
                Status: <strong>{r.status}</strong>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OwnAdoptionRequests;
