import { useEffect, useState } from 'react';
import PetCard from '@/components/PetCard';
import { fetchPets } from '@/api/fetchPets';
import type { Pet } from '@/types/pet';
import { useContext } from 'react';
import { RevealContext } from '@/context/RevealContext';

const HomePage = () => {
  const { setRevealImages } = useContext(RevealContext)!;
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPets()
      .then(setPets)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-center p-4">Loading pets...</p>;
  }
  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex justify-end mb-4">
        <button
          className="bg-primary text-white px-4 py-2 rounded shadow hover:bg-primary-dark transition"
          onClick={() => setRevealImages(true)}
        >
          Reveal All Images
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {pets.map((pet) => (
          <PetCard key={pet.id} pet={pet} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
