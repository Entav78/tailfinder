import { API_PETS, NOROFF_API_KEY } from '@/constants/api';

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
