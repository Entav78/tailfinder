import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { EditButton } from '@/components/Buttons/EditButton';
import { isOwner } from '@/types/pet';
import { useAuthStore } from '@/store/authStore';
import { usePetStore } from '@/store/petStore';
import { AdoptButton } from '@/components/Buttons/AdoptButton/AdoptButton';
import { findRequesterName } from '@/utils/findRequesterName';
import { toast } from 'react-hot-toast';

/**
 * @component PetDetailPage
 * Displays detailed information about a specific pet, including appearance, description,
 * owner status, and adoption status.
 *
 * - Fetches pet details from the store if not already loaded
 * - Renders pet attributes (name, image, breed, etc.)
 * - Shows 'Edit' button if the user is the owner and pet is not adopted
 * - Shows 'Adopt' button if pet is available and user is not the owner
 * - Displays adopter name if pet has been adopted
 *
 * @returns {JSX.Element} A full pet detail view with conditional actions based on user and adoption status
 */
const PetDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  const fetchPets = usePetStore((state) => state.fetchPets);
  const updatedPet = usePetStore((state) =>
    state.pets.find((p) => p.id === id)
  );

  const currentUser = useAuthStore((state) => state.user?.name);
  const userIsOwner = updatedPet ? isOwner(updatedPet, currentUser) : false;

  useEffect(() => {
    if (!updatedPet) {
      fetchPets();
    }
  }, [updatedPet, fetchPets]);

  if (!updatedPet) return <p className="text-center p-4">Loading pet...</p>;

  const {
    name,
    image,
    species,
    breed,
    age,
    gender,
    size,
    color,
    location,
    adoptionStatus,
    description,
    owner,
  } = updatedPet;

  const ownerCheck = isOwner(updatedPet, currentUser);
  const isAdopted = adoptionStatus === 'Adopted';

  const handleShare = (petId: string) => {
    const shareUrl = `${window.location.origin}/pets/${petId}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      toast.success('Link copied to clipboard!');
    });
  };

  return (
    <section className="max-w-3xl mx-auto p-4">
      <div className="bg-card dark:bg-darkCard shadow rounded-lg">
        {image?.url ? (
          <img
            src={image.url}
            alt={image.alt || `${name} the ${breed}`}
            className="w-full h-auto max-h-[400px] object-cover rounded-t"
          />
        ) : (
          <div className="w-full h-64 bg-border-light dark:bg-border-dark flex items-center justify-center text-text-placeholder">
            No image available
          </div>
        )}

        <div className="p-6 bg-card dark:bg-darkCard rounded shadow">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-bold text-text-base dark:text-text-base-dark">
              {name}
            </h1>
            <button
              onClick={() => handleShare(updatedPet.id)}
              className="text-sm text-header hover:underline inline-flex items-center gap-1 px-2 py-2 min-w-[44px] min-h-[44px] rounded transition dark:text-text-base-dark"
              title="Copy link to this pet"
            >
              <span>🔗</span>
              <span>Copy Link</span>
            </button>
          </div>

          <p className="text-text-muted dark:text-text-subtle mb-1">
            <strong>Species:</strong> {species}
          </p>
          <p className="text-text-muted dark:text-text-subtle mb-1">
            <strong>Breed:</strong> {breed}
          </p>
          <p className="text-text-muted dark:text-text-subtle mb-1">
            <strong>Age:</strong> {age}
          </p>
          <p className="text-text-muted dark:text-text-subtle mb-1">
            <strong>Gender:</strong> {gender}
          </p>
          <p className="text-text-muted dark:text-text-subtle mb-1">
            <strong>Size:</strong> {size}
          </p>
          <p className="text-text-muted dark:text-text-subtle mb-1">
            <strong>Color:</strong> {color}
          </p>
          <p className="text-text-muted dark:text-text-subtle mb-1">
            <strong>Location:</strong> {location}
          </p>
          <p className="text-text-muted dark:text-text-subtle mb-1">
            <strong>Status:</strong>{' '}
            <span className="font-semibold">
              {isAdopted ? 'Adopted' : 'Available'}
            </span>
          </p>

          <p className="text-text-light dark:text-text-soft mt-4">
            {description}
          </p>

          {isAdopted ? (
            <p className="text-sm font-medium text-traffic-green dark:text-traffic-green-dark">
              Adopted by: {findRequesterName(updatedPet.id)}
            </p>
          ) : (
            owner?.name && (
              <p className="text-sm text-text-muted dark:text-text-subtle">
                <strong>Owner:</strong> {owner.name}
              </p>
            )
          )}

          {ownerCheck && !isAdopted && (
            <EditButton
              petId={updatedPet.id}
              adoptionStatus={updatedPet.adoptionStatus}
              ownerCheck={ownerCheck}
              className="w-full"
            />
          )}

          {!isAdopted && !userIsOwner && (
            <div className="mt-4">
              <AdoptButton pet={updatedPet} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PetDetailPage;
