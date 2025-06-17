import { getPetsUrl, NOROFF_API_KEY } from '@/constants/api';

/**
 * Deletes a pet from the API by its ID.
 *
 * @param {string} petId - The unique ID of the pet to delete.
 * @param {string} token - The user's access token used for authorization.
 * @throws Will throw an error if the API response is not successful.
 *
 * @example
 * await deletePet('abc123', 'your-access-token');
 */

export async function deletePet(petId: string, token: string) {
  const response = await fetch(`${getPetsUrl()}/${petId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      'X-Noroff-API-Key': NOROFF_API_KEY,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete pet');
  }
}
