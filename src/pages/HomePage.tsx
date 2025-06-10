import { useEffect, useContext } from 'react';
import PetCard from '@/components/PetCard';
import { RevealContext } from '@/context/RevealContext';
import { Button } from '@/components/Buttons/Button';
import { usePetStore } from '@/store/petStore';

const HomePage = () => {
  const context = useContext(RevealContext);
  if (!context) throw new Error('Missing RevealContext');

  const { revealImages, setRevealImages } = context;

  const pets = usePetStore((state) => state.pets);
  const fetchPets = usePetStore((state) => state.fetchPets);

  useEffect(() => {
    if (pets.length === 0) {
      fetchPets();
    }
  }, [pets, fetchPets]);

  if (pets.length === 0) {
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
