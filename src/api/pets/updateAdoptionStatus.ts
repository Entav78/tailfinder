import { API_PETS, NOROFF_API_KEY } from '@/constants/api';

/**
 * Updates the adoption status of a specific pet.
 *
 * @param petId - The ID of the pet to update.
 * @param status - The new adoption status (e.g., 'available', 'pending', 'adopted').
 * @param token - The access token for authentication.
 * @returns A Promise that resolves to the updated pet data from the API.
 * @throws Error if the request fails.
 */

export async function updateAdoptionStatus(
  petId: string,
  status: string,
  token: string
) {
  const response = await fetch(`${API_PETS}/${petId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      'X-Noroff-API-Key': NOROFF_API_KEY,
    },
    body: JSON.stringify({
      adoptionStatus: status,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to update adoption status');
  }

  const data = await response.json();
  return data;
}
