import { useAdoptionRequestStore } from '@/store/adoptionRequestStore';

/**
 * Finds the name of the user who has been approved to adopt a specific pet.
 *
 * @param petId - The ID of the pet to check for an approved adoption request.
 * @returns The name of the requester if found, otherwise `undefined`.
 *
 * @remarks
 * This function accesses the global adoption request store via Zustand and looks
 * for the first request with a status of `'approved'` for the given `petId`.
 */
export function findRequesterName(petId: string): string | undefined {
  const requests = useAdoptionRequestStore.getState().requests;
  return requests.find((r) => r.petId === petId && r.status === 'approved')
    ?.requesterName;
}
