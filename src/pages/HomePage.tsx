import { useEffect, useContext, useState, useMemo } from 'react';
import { PetCard } from '@/components/PetCard/PetCard';
import { RevealContext } from '@/context/RevealContext';
import { Button } from '@/components/Buttons/Button/Button';
import { usePetStore } from '@/store/petStore';
import { SearchAndFilter } from '@/components/SearchAndFilter/SearchAndFilter';
import { filterPets } from '@/utils/filterPets';
import { Pagination } from '@/components/Pagination';

/**
 * @component HomePage
 * Displays the homepage with a list of pets.
 *
 * Functionality includes:
 * - Fetching and displaying pets using `petStore`
 * - Filtering by search term, species inclusion/exclusion, and adoption status
 * - Paginating the filtered pets (8 per page)
 * - Allowing users to toggle whether pet images are shown (via `RevealContext`)
 * - Persisting excluded species and adoption visibility to localStorage
 *
 * Also renders:
 * - SearchAndFilter component for user input
 * - Toggle button for revealing/hiding images
 * - PetCard components in a grid
 * - Pagination controls for navigating pet pages
 */

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
  const [excludedSpecies, setExcludedSpecies] = useState<string[]>(() => {
    const saved = localStorage.getItem('excludedSpecies');
    return saved ? JSON.parse(saved) : [];
  });

  const [showAdopted, setShowAdopted] = useState(() => {
    const saved = localStorage.getItem('showAdopted');
    return saved ? JSON.parse(saved) : false;
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    localStorage.setItem('excludedSpecies', JSON.stringify(excludedSpecies));
  }, [excludedSpecies]);

  useEffect(() => {
    localStorage.setItem('showAdopted', JSON.stringify(showAdopted));
  }, [showAdopted]);

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
    return filterPets(
      pets,
      searchTerm,
      viewMode,
      includedSpecies,
      excludedSpecies,
      showAdopted
    );
  }, [
    pets,
    searchTerm,
    viewMode,
    includedSpecies,
    excludedSpecies,
    showAdopted,
  ]);

  useEffect(() => {
    setCurrentPage(1); // Reset til første side ved søk eller filtrering
  }, [searchTerm, viewMode, includedSpecies, excludedSpecies, showAdopted]);

  const totalPages = Math.ceil(filteredPets.length / itemsPerPage);

  const paginatedPets = filteredPets.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (!pets.length) return <p className="text-center p-4">Loading pets...</p>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <SearchAndFilter
        viewMode={viewMode}
        showAdopted={showAdopted}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        includedSpecies={includedSpecies}
        onIncludedSpeciesChange={setIncludedSpecies}
        excludedSpecies={excludedSpecies}
        onExcludedSpeciesChange={setExcludedSpecies}
        availableSpecies={availableSpecies}
        onShowAdoptedChange={setShowAdopted}
        onViewModeChange={setViewMode}
      />

      <div className="flex justify-end mb-4">
        <Button onClick={() => setRevealImages(!revealImages)} variant="reveal">
          {revealImages ? 'Hide Images' : 'Reveal All Images'}
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {paginatedPets.map((pet) => (
          <PetCard key={pet.id} pet={pet} />
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default HomePage;
