import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPetById } from '@/api/fetchPets';
import type { Pet } from '@/types/pet';

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

  if (loading) return <p className="text-center p-4">Loading pet...</p>;
  if (!pet) return <p className="text-center p-4">Pet not found.</p>;

  return (
    <section className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{pet.name}</h1>

      {pet.image?.url ? (
        <img
          src={pet.image.url}
          alt={pet.image.alt || `${pet.name} the ${pet.breed || 'pet'}`}
          className="w-full h-auto rounded shadow mb-4"
        />
      ) : (
        <div className="w-full h-64 bg-gray-200 rounded shadow mb-4 flex items-center justify-center text-gray-500 text-sm">
          Image not available
        </div>
      )}

      <p className="mb-2">
        <strong>Breed:</strong> {pet.breed}
      </p>
      <p className="mb-2">
        <strong>Age:</strong> {pet.age}
      </p>
      <p className="mb-2">
        <strong>Size:</strong> {pet.size}
      </p>
      <p className="mb-2">
        <strong>Color:</strong> {pet.color}
      </p>
      <p>
        <strong>Description:</strong> {pet.description}
      </p>
    </section>
  );
};

export default PetDetailPage;
