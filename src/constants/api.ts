/**
 * Base URL for the Noroff API.
 * @constant {string}
 */
export const API_BASE = 'https://v2.api.noroff.dev';

/**
 * URL for the pets endpoint.
 * @constant {string}
 */
export const API_PETS = `${API_BASE}/pets`;

/**
 * URL for the auth endpoint (register, login).
 * @constant {string}
 */
export const API_AUTH = `${API_BASE}/auth`;

/**
 * API key for accessing protected Noroff API features.
 * Retrieved from the environment variable `VITE_API_KEY`.
 * @constant {string}
 */
export const NOROFF_API_KEY = import.meta.env.VITE_API_KEY;

/**
 * Returns the base URL for fetching all pets.
 * @function
 * @returns {string} The pets endpoint URL.
 */
export const getPetsUrl = () => API_PETS;

/**
 * Returns the URL for fetching a single pet by ID.
 * @function
 * @param {string} id - The ID of the pet.
 * @returns {string} The URL to fetch the pet with the given ID.
 */
export function getPetByIdUrl(id: string): string {
  return `${API_PETS}/${id}`;
}

/**
 * Returns the URL for user registration.
 * @function
 * @returns {string} The registration endpoint URL.
 */
export function getRegisterUrl(): string {
  return `${API_AUTH}/register`;
}

/**
 * Returns the URL for user login.
 * @function
 * @returns {string} The login endpoint URL.
 */
export function getLoginUrl(): string {
  return `${API_AUTH}/login`;
}
