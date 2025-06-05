export interface Pet {
  id: string;
  name: string;
  breed: string;
  age: number;
  size: string;
  color: string;
  description: string;
  image?: {
    url: string;
    alt?: string;
  };
  owner?: {
    name: string;
  };
}
