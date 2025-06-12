import type { Pet } from '@/types/pet';
import { speciesAliasMap } from './speciesAliasMap';

export function filterPets(
  pets: Pet[],
  searchTerm: string,
  viewMode: string,
  includedSpecies: string[],
  excludedSpecies: string[],
  showAdopted: boolean
): Pet[] {
  const expandedExcluded = new Set<string>();

  excludedSpecies.forEach((term) => {
    const aliases = speciesAliasMap[term] || [term];
    aliases.forEach((alias) => expandedExcluded.add(alias.toLowerCase()));
  });

  return pets.filter((pet) => {
    if (!showAdopted && pet.adoptionStatus === 'Adopted') return false;

    const species = pet.species?.toLowerCase() || '';
    const breed = pet.breed?.toLowerCase() || '';
    const description = pet.description?.toLowerCase() || '';
    const search = searchTerm.toLowerCase();

    const allValues = [
      pet.name,
      species,
      breed,
      pet.age?.toString(),
      pet.gender,
      pet.size,
      pet.color,
      description,
      pet.location,
      pet.owner?.name,
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    const matchesSearch = allValues.includes(search);
    const matchesIncluded =
      viewMode !== 'include' || includedSpecies.includes(species);
    const matchesExcluded = ![...expandedExcluded].some(
      (ex) =>
        species.includes(ex) || breed.includes(ex) || description.includes(ex)
    );

    return matchesSearch && matchesIncluded && matchesExcluded;
  });
}
