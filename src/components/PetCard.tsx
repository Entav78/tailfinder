import { useContext } from 'react';
import { RevealContext } from '@/context/RevealContext';
import type { Pet } from '@/types/pet';
import { Link } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { isOwner } from '@/types/pet';
import { AdoptButton } from '@/components/Buttons/AdoptButton';
import { EditButton } from '@/components/Buttons/EditButton';
import { usePetStore } from '@/store/petStore';
import { toast } from 'react-hot-toast';

interface PetCardProps {
  pet: Pet;
}

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

  // Fallback hvis pet ikke er funnet i store
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

  return (
    <article
      className={`relative bg-white dark:bg-gray-800 shadow rounded p-4 transition hover:shadow-lg ${
        isAdopted ? 'opacity-60' : ''
      }`}
    >
      <Link to={`/pets/${id}`} className="block group">
        {revealImages && image?.url ? (
          <img
            src={image.url}
            alt={image.alt || `${name} the ${breed || 'pet'}`}
            className="w-full h-48 object-cover rounded mb-4 group-hover:opacity-90 transition"
          />
        ) : (
          <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center rounded mb-4">
            <p className="text-gray-500 dark:text-gray-300 text-sm">
              Image hidden
            </p>
          </div>
        )}

        <div className="flex items-center justify-between mb-1">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white group-hover:underline">
            {name}
          </h2>
          <button
            onClick={() => handleShare(pet.id)}
            className="text-sm text-header hover:underline flex items-center gap-1 transition"
            title="Copy link to this pet"
          >
            <span>🔗</span>
            <span>Copy Link</span>
          </button>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
          {breed !== 'Unknown' ? breed : ''}
        </p>

        <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
          Age: {age} • Size: {size} • Color: {color}
        </p>

        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
          {description}
        </p>

        {currentUser && owner?.name && (
          <p className="text-sm text-gray-500 mt-2">Owner: {owner.name}</p>
        )}

        {isAdopted && (
          <div className="absolute top-2 right-2 bg-adoptedBadge text-white text-xs px-2 py-1 rounded shadow">
            Adopted
          </div>
        )}
      </Link>

      <div className="mt-4 flex gap-2">
        {currentUser && !ownerCheck && !isAdopted && (
          <AdoptButton pet={updatedPet} />
        )}
      </div>
      {ownerCheck && !isAdopted && (
        <EditButton
          petId={updatedPet.id}
          adoptionStatus={updatedPet.adoptionStatus}
          ownerCheck={ownerCheck}
        />
      )}
    </article>
  );
};
