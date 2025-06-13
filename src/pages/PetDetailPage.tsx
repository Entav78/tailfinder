import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/Buttons/Button';
import { isOwner } from '@/types/pet';
import { useAuthStore } from '@/store/authStore';
import { usePetStore } from '@/store/petStore';
import { AdoptButton } from '@/components/Buttons/AdoptButton';
import { findRequesterName } from '@/utils/findRequesterName';

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
      fetchPets(); // henter dyrene hvis det ikke er noen lagret
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

  const isAdopted = adoptionStatus === 'Adopted';

  return (
    <section className="max-w-3xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
        {image?.url ? (
          <img
            src={image.url}
            alt={image.alt || `${name} the ${breed}`}
            className="w-full h-64 object-cover"
          />
        ) : (
          <div className="w-full h-64 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500">
            No image available
          </div>
        )}

        <div className="p-6">
          <h1 className="text-3xl font-bold mb-2">{name}</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-1">
            <strong>Species:</strong> {species}
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-1">
            <strong>Breed:</strong> {breed}
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-1">
            <strong>Age:</strong> {age}
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-1">
            <strong>Gender:</strong> {gender}
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-1">
            <strong>Size:</strong> {size}
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-1">
            <strong>Color:</strong> {color}
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-1">
            <strong>Location:</strong> {location}
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-1">
            <strong>Status:</strong>{' '}
            <span className="font-semibold">
              {isAdopted ? 'Adopted' : 'Available'}
            </span>
          </p>
          <p className="text-gray-700 dark:text-gray-200 mt-4">{description}</p>

          {currentUser && owner?.name && (
            <p className="text-gray-500 dark:text-gray-300 mt-2 text-sm">
              <strong>Owner:</strong> {owner.name}
            </p>
          )}

          {!isAdopted && userIsOwner && (
            <Link to={`/manage/${updatedPet.id}`}>
              <Button variant="secondary">Edit Pet</Button>
            </Link>
          )}

          {!isAdopted && !userIsOwner && (
            <div className="mt-4">
              <AdoptButton pet={updatedPet} />
            </div>
          )}

          {isAdopted && userIsOwner && (
            <p className="mt-4 font-medium text-green-600 dark:text-green-400">
              Adopted by: {findRequesterName(updatedPet.id)}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default PetDetailPage;
