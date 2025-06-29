import { useContext } from 'react';
import { RevealContext } from '@/context/RevealContext';
import type { Pet } from '@/types/pet';
import { Link } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { isOwner } from '@/types/pet';
import { AdoptButton } from '@/components/Buttons/AdoptButton/AdoptButton';
import { EditButton } from '@/components/Buttons/EditButton';
import { usePetStore } from '@/store/petStore';
import { toast } from 'react-hot-toast';
import { AdoptedBadge } from '../AdoptedBadge';

/**
 * Props for the PetCard component.
 * @property {Pet} pet - The pet object to display.
 */
interface PetCardProps {
  pet: Pet;
}

/**
 * A card component that displays pet details including name, image, description, and status.
 * Includes logic for conditionally rendering Adopt and Edit buttons, and a share link button.
 *
 * @component
 * @param {PetCardProps} props - Props including a single pet.
 * @returns {JSX.Element} A styled card with pet information and actions.
 *
 * @throws Will throw an error if used outside of a RevealProvider context.
 */
export const PetCard = ({ pet }: PetCardProps) => {
  const context = useContext(RevealContext);

  if (!context) {
    throw new Error(
      'RevealContext is missing. Did you forget to wrap in <RevealProvider>?'
    );
  }

  const { revealImages } = context;
  const currentUser = useAuthStore((state) => state.user?.name);

  const updatedPet = usePetStore((state) =>
    state.pets.find((p) => p.id === pet.id)
  );

  if (!updatedPet) return null;

  const {
    id,
    name,
    description,
    image,
    breed,
    age,
    size,
    color,
    owner,
    adoptionStatus,
  } = updatedPet;

  const ownerCheck = isOwner(updatedPet, currentUser);
  const isAdopted = adoptionStatus === 'Adopted';

  /**
   * Handles the share link functionality by copying the pet's URL to the clipboard.
   * Displays a toast message upon success or failure.
   *
   * @param {string} petId - The unique ID of the pet to share.
   * @returns {Promise<void>}
   */
  const handleShare = async (petId: string) => {
    try {
      const url = `${window.location.origin}/pets/${petId}`;
      await navigator.clipboard.writeText(url);
      toast.success('Link copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy:', err);
      toast.error('Could not copy the link.');
    }
  };

  const defaultImage = '/img/default-pet.jpg';

  return (
    <article
      className={`relative bg-card dark:bg-darkCard shadow rounded p-4 flex flex-col justify-between min-h-[380px] transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl ${
        isAdopted ? 'opacity-80' : ''
      }`}
    >
      <div className="grow">
        <Link to={`/pets/${id}`} className="block group">
          {revealImages && image?.url ? (
            <img
              src={image?.url || defaultImage}
              alt={image?.alt || `${name} the ${breed || 'pet'}`}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = defaultImage;
              }}
              className="w-full h-48 object-cover rounded mb-4"
            />
          ) : (
            <div className="w-full h-48 bg-border-light dark:bg-border-dark flex items-center justify-center rounded mb-4">
              <p className="text-text-light dark:text-text-soft text-sm font-medium">
                Image hidden
              </p>
            </div>
          )}

          <div className="flex items-center justify-between mb-1">
            <h2 className="text-xl font-semibold text-text-base dark:text-text-base-dark group-hover:underline">
              {name}
            </h2>
            <button
              onClick={() => handleShare(pet.id)}
              className="text-sm text-header hover:underline inline-flex items-center gap-1 px-2 py-2 min-w-[44px] min-h-[44px] rounded transition dark:text-text-base-dark"
              title="Copy link to this pet"
            >
              <span>🔗</span>
              <span>Copy Link</span>
            </button>
          </div>

          <p className="text-sm text-text-light dark:text-text-soft mb-1">
            {breed !== 'Unknown' ? breed : ''}
          </p>

          <p className="text-sm text-text-light dark:text-text-soft mb-1">
            Age: {age} • Size: {size} • Color: {color}
          </p>

          <p className="text-sm text-text-light dark:text-text-soft line-clamp-2 min-h-[3rem] overflow-hidden break-words">
            {description}
          </p>

          {currentUser && owner?.name && (
            <p className="text-sm text-text-muted dark:text-text-base-dark mt-2">
              Owner: {owner.name}
            </p>
          )}

          {isAdopted && (
            <AdoptedBadge className="absolute top-2 right-2 shadow" />
          )}
        </Link>
      </div>

      <div className="mt-auto flex gap-2">
        {currentUser && !ownerCheck && !isAdopted && (
          <AdoptButton pet={updatedPet} />
        )}
      </div>

      {ownerCheck && !isAdopted && (
        <EditButton
          petId={updatedPet.id}
          adoptionStatus={updatedPet.adoptionStatus}
          ownerCheck={ownerCheck}
          className="w-full"
        />
      )}
    </article>
  );
};
