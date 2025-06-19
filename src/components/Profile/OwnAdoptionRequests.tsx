/**
 * @component OwnAdoptionRequests
 * Displays a list of the current user's adoption requests along with pet information.
 * If the user has not made any adoption requests, a placeholder message is shown.
 *
 * @param {AdoptionRequest[]} ownRequests - List of adoption requests made by the logged-in user.
 * @param {Pet[]} allPets - Full list of pets used to match pet information to each request.
 *
 * @returns {JSX.Element} A list of cards showing pet details and request status, or a fallback message if no requests exist.
 */

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
              <p className="font-semibold text-lg text-text-base dark:text-text-base-dark">
                {pet?.name}
              </p>
              <p className="text-sm text-text-muted dark:text-text-subtle">
                {pet && pet.breed !== 'Unknown' ? pet.breed : ''}
              </p>
              <p className="text-sm mt-1 text-text-muted dark:text-text-subtle">
                Status:{' '}
                <strong
                  className={`capitalize ${
                    r.status === 'approved'
                      ? 'text-traffic-green dark:text-traffic-green-dark'
                      : r.status === 'pending'
                      ? 'text-traffic-yellow dark:text-traffic-yellow-dark'
                      : 'text-traffic-red dark:text-traffic-red-dark'
                  }`}
                >
                  {r.status}
                </strong>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OwnAdoptionRequests;
