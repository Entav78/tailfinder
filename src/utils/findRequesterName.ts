import { useAdoptionRequestStore } from '@/store/adoptionRequestStore';

export function findRequesterName(petId: string): string | undefined {
  const requests = useAdoptionRequestStore.getState().requests;
  return requests.find((r) => r.petId === petId && r.status === 'approved')
    ?.requesterName;
}
