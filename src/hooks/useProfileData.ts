import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useAdoptionRequestStore } from '@/store/adoptionRequestStore';
import { getPetsUrl } from '@/constants/api';
import { usePetStore } from '@/store/petStore';
import type { Pet } from '@/types/pet';
import type { AdoptionRequest } from '@/store/adoptionRequestStore';
import toast from 'react-hot-toast';
import { updateAdoptionStatus } from '@/api/pets/updateAdoptionStatus';

/**
 * Custom hook for handling user-related profile data and adoption requests.
 *
 * Responsibilities:
 * - Fetches all pets and filters out those owned by the current user.
 * - Retrieves adoption requests both made by the user and for the user's pets.
 * - Provides a handler to update the status of an adoption request (approve/decline),
 *   and updates the pet's status via API if approved.
 * - Tracks which adoption requests have been seen by the user or the requester.
 *
 * @returns {{
 *   user: User | null,
 *   accessToken: string | null,
 *   loading: boolean,
 *   userPets: Pet[],
 *   requests: AdoptionRequest[],
 *   ownRequests: AdoptionRequest[],
 *   allPets: Pet[],
 *   handleUpdate: (
 *     petId: string,
 *     requesterName: string,
 *     status: 'approved' | 'declined'
 *   ) => Promise<void>
 * }}
 */
export function useProfileData() {
  const user = useAuthStore((state) => state.user);
  const accessToken = useAuthStore((state) => state.accessToken);
  const fetchPets = usePetStore((state) => state.fetchPets);
  const updateStatus = useAdoptionRequestStore(
    (state) => state.updateRequestStatus
  );
  const adoptionRequests = useAdoptionRequestStore((state) => state.requests);
  const markRequestsAsSeen = useAdoptionRequestStore(
    (state) => state.markRequestsAsSeen
  );

  const [userPets, setUserPets] = useState<Pet[]>([]);
  const [requests, setRequests] = useState<AdoptionRequest[]>([]);
  const [ownRequests, setOwnRequests] = useState<AdoptionRequest[]>([]);
  const [allPets, setAllPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserPets = async () => {
      try {
        const res = await fetch(getPetsUrl());
        const json = await res.json();
        const allFetchedPets: Pet[] = json.data;
        setAllPets(allFetchedPets);

        const filtered = allFetchedPets.filter(
          (pet) => pet.owner?.name === user?.name
        );
        setUserPets(filtered);
      } catch (err) {
        console.error('Failed to fetch pets:', err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.name) fetchUserPets();
  }, [user?.name]);

  useEffect(() => {
    if (user?.name && userPets.length > 0) {
      const fetchedRequests = adoptionRequests.filter((req) =>
        userPets.some(
          (pet) => pet.id === req.petId && pet.owner?.name === user.name
        )
      );
      setRequests(fetchedRequests);
    }
  }, [user?.name, userPets, adoptionRequests]);

  useEffect(() => {
    if (user?.name) {
      const fetchedOwnRequests = adoptionRequests.filter(
        (r) => r.requesterName === user.name
      );
      setOwnRequests(fetchedOwnRequests);
    }
  }, [user?.name, adoptionRequests]);

  const handleUpdate = async (
    petId: string,
    requesterName: string,
    status: 'approved' | 'declined'
  ) => {
    try {
      if (!accessToken) throw new Error('No token found');

      if (status === 'approved') {
        await updateAdoptionStatus(petId, 'Adopted', accessToken);
        await usePetStore.getState().fetchPets();
      }

      updateStatus(petId, requesterName, status);

      if (user?.name) {
        markRequestsAsSeen('owner', user.name);
      }

      toast.success(
        `You have ${
          status === 'approved' ? 'approved' : 'declined'
        } the request from ${requesterName}`
      );

      await fetchPets();
    } catch (error) {
      console.error('Error updating adoption status:', error);
      toast.error('Something went wrong. Please try again.');
    }
  };

  useEffect(() => {
    if (!user?.name) return;

    const unseenRequesterResponses = adoptionRequests.some(
      (r) =>
        r.requesterName === user.name &&
        (r.status === 'approved' || r.status === 'declined') &&
        !r.seenByRequester
    );

    if (unseenRequesterResponses) {
      markRequestsAsSeen('requester', user.name);
    }
  }, [user?.name, adoptionRequests, markRequestsAsSeen]);

  return {
    user,
    accessToken,
    loading,
    userPets,
    requests,
    ownRequests,
    allPets,
    handleUpdate,
  };
}
