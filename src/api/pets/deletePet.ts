import { getPetsUrl, NOROFF_API_KEY } from '@/constants/api';

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
