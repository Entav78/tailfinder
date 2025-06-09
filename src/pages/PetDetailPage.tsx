import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPetById } from '@/api/fetchPets';
import type { Pet } from '@/types/pet';
import { Link } from 'react-router-dom';
import { Button } from '@/components/Buttons/Button';
import { isOwner } from '@/types/pet';
import { useAuthStore } from '@/store/authStore';

const PetDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [pet, setPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    getPetById(id)
      .then(setPet)
      .catch((err) => console.error('Failed to load pet details', err))
      .finally(() => setLoading(false));
  }, [id]);

  const currentUser = useAuthStore((state) => state.user?.name);

  if (loading) return <p className="text-center p-4">Loading pet...</p>;
  if (!pet) return <p className="text-center p-4">Pet not found.</p>;

  const userIsOwner = isOwner(pet, currentUser);

  return (
    <section className="max-w-3xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
        {pet.image?.url ? (
          <img
            src={pet.image.url}
            alt={pet.image.alt || `${pet.name} the ${pet.breed}`}
            className="w-full h-64 object-cover"
          />
        ) : (
          <div className="w-full h-64 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500">
            No image available
          </div>
        )}

        <div className="p-6">
          <h1 className="text-3xl font-bold mb-2">{pet.name}</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-1">
            <strong>Species:</strong> {pet.species}
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-1">
            <strong>Breed:</strong> {pet.breed}
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-1">
            <strong>Age:</strong> {pet.age}
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-1">
            <strong>Gender:</strong> {pet.gender}
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-1">
            <strong>Size:</strong> {pet.size}
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-1">
            <strong>Color:</strong> {pet.color}
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-1">
            <strong>Location:</strong> {pet.location}
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-1">
            <strong>Status:</strong> {pet.adoptionStatus || 'Available'}
          </p>
          <p className="text-gray-700 dark:text-gray-200 mt-4">
            {pet.description}
          </p>
          {currentUser && pet.owner?.name && (
            <p className="text-gray-500 dark:text-gray-300 mt-2 text-sm">
              <strong>Owner:</strong> {pet.owner.name}
            </p>
          )}
          {userIsOwner && (
            <div className="mt-6">
              <Link to={`/pets/edit/${pet.id}`}>
                <Button variant="secondary">Edit Pet</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PetDetailPage;
