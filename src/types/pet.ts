/**
 * Represents a pet available for adoption.
 */
export interface Pet {
  /** Unique identifier for the pet */
  id: string;

  /** Pet's name */
  name: string;

  /** Pet's species (e.g., Dog, Cat) */
  species: string;

  /** Pet's breed */
  breed: string;

  /** Pet's age in years */
  age: number;

  /** Pet's gender (e.g., Male, Female) */
  gender: string;

  /** Pet's size (e.g., Small, Medium, Large) */
  size: string;

  /** Pet's color */
  color: string;

  /** A description of the pet */
  description: string;

  /** The location where the pet is currently located */
  location: string;

  /** Current adoption status (defaults to "Available") */
  adoptionStatus?: string;

  /** Image object with URL and alt text for accessibility */
  image: {
    /** Image URL */
    url: string;
    /** Alt text for the image */
    alt: string;
  };

  /** Owner information if available */
  owner?: {
    /** Name of the pet's owner */
    name: string;
    /** Owner's email address (optional) */
    email?: string;
  };
}

/**
 * Checks if the current user is the owner of a given pet.
 *
 * @param pet - The pet object to check.
 * @param currentUserName - The name of the current logged-in user.
 * @returns `true` if the current user is the pet's owner, otherwise `false`.
 */
export function isOwner(pet: Pet, currentUserName?: string): boolean {
  if (!currentUserName) return false;

  if (typeof pet.owner === 'string') {
    return pet.owner === currentUserName;
  }

  return pet.owner?.name === currentUserName;
}
