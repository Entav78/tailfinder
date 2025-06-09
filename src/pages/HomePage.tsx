import { useEffect, useState } from 'react';
import PetCard from '@/components/PetCard';
import { fetchPets } from '@/api/pets/fetchPets';
import type { Pet } from '@/types/pet';
import { useContext } from 'react';
import { RevealContext } from '@/context/RevealContext';
import { Button } from '@/components/Buttons/Button';

const HomePage = () => {
  const context = useContext(RevealContext);
  if (!context) throw new Error('Missing RevealContext');

  const { revealImages, setRevealImages } = context;

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
        <Button onClick={() => setRevealImages(!revealImages)} variant="reveal">
          {revealImages ? 'Hide Images' : 'Reveal All Images'}
        </Button>
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
