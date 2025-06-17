import type { Pet } from '@/types/pet';
import { speciesAliasMap } from './speciesAliasMap';

/**
 * Filters an array of pets based on search criteria.
 *
 * @param pets - The array of pets to filter.
 * @param searchTerm - The term to search for within pet properties.
 * @param viewMode - The current view mode (e.g., 'include' to filter by `includedSpecies`).
 * @param includedSpecies - A list of species to explicitly include (used when `viewMode` is 'include').
 * @param excludedSpecies - A list of species (and their aliases) to exclude from results.
 * @param showAdopted - Whether to include pets marked as 'Adopted'.
 * @returns A filtered list of pets matching the criteria.
 *
 * @remarks
 * Currently, species aliases are defined for both **"snake"** and **"spider"** in `speciesAliasMap`.
 * These aliases help ensure more thorough filtering by matching related terms (e.g., "python", "tarantula").
 * Other species without aliases will still be filtered based on exact term matches only.
 */
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
