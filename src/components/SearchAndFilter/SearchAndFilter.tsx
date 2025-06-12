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
    <div className="flex flex-col gap-4 mb-6">
      {/* Search */}
      <div className="relative">
        <span className="absolute inset-y-0 left-3 flex items-center">
          <MagnifyingGlassIcon className="w-5 h-5 text-header" />
        </span>
        <input
          type="text"
          placeholder="Search pets..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="input-style pl-10"
        />
      </div>

      {/* Show adopted pets */}
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={showAdopted}
          onChange={(e) => onShowAdoptedChange(e.target.checked)}
        />
        Show adopted pets
      </label>

      {/* View mode selection */}
      <div>
        <label className="block font-medium mb-1">View mode:</label>
        <select
          value={viewMode}
          onChange={(e) =>
            onViewModeChange(e.target.value as 'all' | 'exclude' | 'include')
          }
          className="select-style"
        >
          <option value="all">Show all species</option>
          <option value="exclude">Hide selected species</option>
          <option value="include">Only show selected species</option>
        </select>
      </div>

      {/* Exclude checkboxes */}
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

      {/* Include checkboxes */}
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
