import { useEffect, useState } from 'react';
import PetCard from '@/components/PetCard';
import { fetchPets } from '@/api/fetchPets';
import type { Pet } from '@/types/pet';

const HomePage = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPets()
      .then(setPets)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-4">
      {loading ? (
        <p className="text-center">Loading pets...</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {pets.map((pet) => (
            <PetCard key={pet.id} pet={pet} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
