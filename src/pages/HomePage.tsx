import { useEffect, useContext, useState, useMemo } from 'react';
import PetCard from '@/components/PetCard';
import { RevealContext } from '@/context/RevealContext';
import { Button } from '@/components/Buttons/Button';
import { usePetStore } from '@/store/petStore';
import { SearchAndFilter } from '@/components/SearchAndFilter/SearchAndFilter';

const HomePage = () => {
  const context = useContext(RevealContext);
  if (!context) throw new Error('Missing RevealContext');

  const { revealImages, setRevealImages } = context;

  const pets = usePetStore((state) => state.pets);
  const fetchPets = usePetStore((state) => state.fetchPets);

  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'all' | 'exclude' | 'include'>(
    'all'
  );
  const [includedSpecies, setIncludedSpecies] = useState<string[]>([]);
  const [excludedSpecies, setExcludedSpecies] = useState<string[]>([]);

  useEffect(() => {
    fetchPets();
  }, [fetchPets]);

  const availableSpecies = useMemo(() => {
    const speciesSet = new Set<string>();
    pets.forEach((pet) => {
      if (pet.species) speciesSet.add(pet.species.toLowerCase());
    });
    return Array.from(speciesSet).sort();
  }, [pets]);

  const filteredPets = useMemo(() => {
    return pets.filter((pet) => {
      const species = pet.species?.toLowerCase() || '';
      const breed = pet.breed?.toLowerCase() || '';
      const name = pet.name.toLowerCase();

      const matchesSearch = name.includes(searchTerm.toLowerCase());

      const matchesIncluded =
        viewMode !== 'include' ||
        includedSpecies.length === 0 ||
        includedSpecies.includes(species);

      const matchesExcluded =
        viewMode !== 'exclude' || !excludedSpecies.includes(species);

      const breedBlocked =
        viewMode === 'exclude' &&
        excludedSpecies.some((excluded) => breed.includes(excluded));

      return (
        matchesSearch && matchesIncluded && matchesExcluded && !breedBlocked
      );
    });
  }, [pets, searchTerm, viewMode, includedSpecies, excludedSpecies]);

  if (!pets.length) return <p className="text-center p-4">Loading pets...</p>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <SearchAndFilter
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        includedSpecies={includedSpecies}
        onIncludedSpeciesChange={setIncludedSpecies}
        excludedSpecies={excludedSpecies}
        onExcludedSpeciesChange={setExcludedSpecies}
        availableSpecies={availableSpecies}
      />

      <div className="flex justify-end mb-4">
        <Button onClick={() => setRevealImages(!revealImages)} variant="reveal">
          {revealImages ? 'Hide Images' : 'Reveal All Images'}
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredPets.map((pet) => (
          <PetCard key={pet.id} pet={pet} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
