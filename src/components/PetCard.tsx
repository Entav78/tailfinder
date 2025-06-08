import { useContext } from 'react';
import { RevealContext } from '@/context/RevealContext';
import type { Pet } from '@/types/pet';
import { Link } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/Button/Button';
import { isOwner } from '@/types/pet';

interface PetCardProps {
  pet: Pet;
}

const PetCard = ({ pet }: PetCardProps) => {
  const context = useContext(RevealContext);

  if (!context) {
    throw new Error(
      'RevealContext is missing. Did you forget to wrap in <RevealProvider>?'
    );
  }

  const { revealImages } = context;
  const { id, name, description, image, breed, age, size, color, owner } = pet;

  const currentUser = useAuthStore((state) => state.user?.name);
  const ownerCheck = isOwner(pet, currentUser);

  return (
    <article className="bg-white dark:bg-gray-800 shadow rounded p-4 transition hover:shadow-lg">
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

        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-1 group-hover:underline">
          {name}
        </h2>

        <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">{breed}</p>

        <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
          Age: {age} • Size: {size} • Color: {color}
        </p>

        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
          {description}
        </p>
        {currentUser && owner?.name && (
          <p className="text-sm text-gray-500 mt-2">Owner: {owner.name}</p>
        )}
      </Link>

      <div className="mt-4 flex gap-2">
        <Button variant="primary">Adopt</Button>
        {ownerCheck && <Button variant="secondary">Edit</Button>}
      </div>
    </article>
  );
};

export default PetCard;
