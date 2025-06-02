export const API_BASE = 'https://v2.api.noroff.dev';
export const API_PETS = `${API_BASE}/pets`;

export const getPetsUrl = () => API_PETS;

export function getPetByIdUrl(id: string): string {
  return `https://v2.api.noroff.dev/online-shop/${id}`;
}
