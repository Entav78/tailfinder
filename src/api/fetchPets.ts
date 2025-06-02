import { getPetsUrl, getPetByIdUrl } from '@/constants/api';
import type { Pet } from '@/types/pet';

export async function fetchPets(): Promise<Pet[]> {
  const response = await fetch(getPetsUrl());

  if (!response.ok) {
    throw new Error('Failed to fetch pets');
  }

  const json = await response.json();
  return json.data;
}

export async function getPetById(id: string): Promise<Pet> {
  const response = await fetch(getPetByIdUrl(id));

  if (!response.ok) {
    throw new Error(`Failed to fetch pet with id: ${id}`);
  }

  const json = await response.json();
  return json.data;
}
