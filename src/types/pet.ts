export interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: number;
  gender: string;
  size: string;
  color: string;
  description: string;
  location: string;
  adoptionStatus?: string; // optional – defaults to "Available"
  image: {
    url: string;
    alt: string;
  };
  owner?: {
    name: string;
    email?: string;
  };
}

export function isOwner(pet: Pet, currentUserName?: string): boolean {
  return pet.owner?.name === currentUserName;
}

{
  /* for later use if I need it
export type { Pet };
export { isOwner };*/
}
