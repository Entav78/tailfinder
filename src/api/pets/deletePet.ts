import { getPetsUrl } from '@/constants/api';

export async function deletePet(petId: string, token: string) {
  const response = await fetch(`${getPetsUrl()}/${petId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete pet');
  }
}
