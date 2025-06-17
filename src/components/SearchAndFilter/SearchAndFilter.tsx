/**
 * @component SearchAndFilter
 * A UI component for searching and filtering pets based on free text, adoption status, and species.
 *
 * Includes:
 * - A search input that filters by any visible text on the pet card (e.g., name, owner, species, breed)
 * - A checkbox to toggle showing adopted pets
 * - A dropdown to choose between including or excluding specific species
 * - Dynamic checkboxes to include or exclude species based on the selected mode
 *
 * Note:
 * - The search input is not limited to the pet name — it matches any text content rendered in each card.
 * - If a user excludes a species (e.g., "snake"), the pets of that species will not show, even if "Show all species" is selected later — the exclusion remains unless manually unchecked.
 *
 * @param {Object} props - Component props
 * @param {'all' | 'include' | 'exclude'} props.viewMode - Current filtering mode for species
 * @param {(value: 'all' | 'include' | 'exclude')} props.onViewModeChange - Callback to update the view mode
 * @param {string} props.searchTerm - The current free-text search term
 * @param {(value: string)} props.onSearchChange - Callback to update the search term
 * @param {string[]} props.includedSpecies - Species explicitly included when view mode is 'include'
 * @param {(value: string[])} props.onIncludedSpeciesChange - Callback to update included species
 * @param {string[]} props.excludedSpecies - Species to exclude when view mode is 'exclude'
 * @param {(value: string[])} props.onExcludedSpeciesChange - Callback to update excluded species
 * @param {string[]} props.availableSpecies - All available species for filtering
 * @param {boolean} props.showAdopted - Whether to show adopted pets
 * @param {(value: boolean)} props.onShowAdoptedChange - Callback to toggle adopted pets visibility
 *
 * @returns {JSX.Element} A component with search and filtering controls
 */

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface SearchAndFilterProps {
  viewMode: 'all' | 'include' | 'exclude';
  onViewModeChange: (value: 'all' | 'include' | 'exclude') => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  includedSpecies: string[];
  onIncludedSpeciesChange: (value: string[]) => void;
  excludedSpecies: string[];
  onExcludedSpeciesChange: (value: string[]) => void;
  availableSpecies: string[];
  showAdopted: boolean;
  onShowAdoptedChange: (value: boolean) => void;
}

export function SearchAndFilter({
  viewMode,
  onViewModeChange,
  searchTerm,
  onSearchChange,
  includedSpecies,
  onIncludedSpeciesChange,
  excludedSpecies,
  onExcludedSpeciesChange,
  availableSpecies,
  showAdopted,
  onShowAdoptedChange,
}: SearchAndFilterProps) {
  const handleCheckboxChange = (
    value: string,
    currentList: string[],
    updateFn: (newList: string[]) => void
  ) => {
    if (currentList.includes(value)) {
      updateFn(currentList.filter((item) => item !== value));
    } else {
      updateFn([...currentList, value]);
    }
  };

  return (
    <div className="mb-6">
      {/* Search input with icon */}
      <div className="relative mb-1 w-full">
        <span className="absolute inset-y-0 left-3 flex items-center">
          <MagnifyingGlassIcon className="w-5 h-5 text-header" />
        </span>
        <input
          type="text"
          placeholder="Search pets..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="input-style pl-10 w-full rounded dark:text-text-base dark:placeholder-text-placeholder"
        />
      </div>

      {/* Show adopted checkbox */}
      <label className="flex items-center gap-2 text-sm mb-4 ml-4">
        <input
          type="checkbox"
          checked={showAdopted}
          onChange={(e) => onShowAdoptedChange(e.target.checked)}
          className="accent-header"
        />
        Show adopted pets
      </label>

      {/* View mode */}
      <div className="mb-4">
        <label htmlFor="viewMode" className="block font-medium mb-1 ml-4">
          View mode:
        </label>
        <select
          id="viewMode"
          value={viewMode}
          onChange={(e) =>
            onViewModeChange(e.target.value as 'all' | 'exclude' | 'include')
          }
          className="select-style w-full pl-3 rounded dark:text-text-base dark:placeholder-text-placeholder"
        >
          <option value="all">Show all species</option>
          <option value="exclude">Hide selected species</option>
          <option value="include">Only show selected species</option>
        </select>
      </div>

      {/* Exclude species checkboxes */}
      {viewMode === 'exclude' && (
        <div>
          <label className="block font-medium mb-1">Hide species:</label>
          <div className="flex flex-wrap gap-2">
            {availableSpecies.map((s) => (
              <label key={s} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={s}
                  checked={excludedSpecies.includes(s)}
                  onChange={() =>
                    handleCheckboxChange(
                      s,
                      excludedSpecies,
                      onExcludedSpeciesChange
                    )
                  }
                />
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Include species checkboxes */}
      {viewMode === 'include' && (
        <div>
          <label className="block font-medium mb-1">
            Only show these species:
          </label>
          <div className="flex flex-wrap gap-2">
            {availableSpecies.map((s) => (
              <label key={s} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={s}
                  checked={includedSpecies.includes(s)}
                  onChange={() =>
                    handleCheckboxChange(
                      s,
                      includedSpecies,
                      onIncludedSpeciesChange
                    )
                  }
                />
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
