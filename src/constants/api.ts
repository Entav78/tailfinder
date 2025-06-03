// api.ts
export const API_BASE = 'https://v2.api.noroff.dev';
export const API_PETS = `${API_BASE}/pets`;
export const API_AUTH = `${API_BASE}/auth`;

export const getPetsUrl = () => API_PETS;

export function getPetByIdUrl(id: string): string {
  return `${API_PETS}/${id}`;
}

export function getRegisterUrl(): string {
  return `${API_AUTH}/register`;
}

export function getLoginUrl(): string {
  return `${API_AUTH}/login`;
}
