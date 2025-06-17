import { getPetsUrl, getPetByIdUrl } from '@/constants/api';
import type { Pet } from '@/types/pet';

/**
 * Fetches all pets from the API.
 *
 * @returns A Promise that resolves to an array of Pet objects.
 * @throws Error if the API call fails.
 */

export async function fetchPets(): Promise<Pet[]> {
  const response = await fetch(getPetsUrl());

  if (!response.ok) {
    throw new Error('Failed to fetch pets');
  }

  const json = await response.json();
  return json.data;
}

/**
 * Fetches a single pet by its ID.
 *
 * @param id - The ID of the pet to fetch.
 * @returns A Promise that resolves to the Pet object.
 * @throws Error if the API call fails or the ID is invalid.
 */

export async function getPetById(id: string): Promise<Pet> {
  const response = await fetch(getPetByIdUrl(id));

  if (!response.ok) {
    throw new Error(`Failed to fetch pet with id: ${id}`);
  }

  const json = await response.json();
  return json.data;
}
