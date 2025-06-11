import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useAdoptionRequestStore } from '@/store/adoptionRequestStore';
import { getPetsUrl } from '@/constants/api';
import { updateAdoptionStatus as updateAdoptionStatusApi } from '@/api/pets/updateAdoptionStatus';
import { usePetStore } from '@/store/petStore';
import type { Pet } from '@/types/pet';
import type { AdoptionRequest } from '@/store/adoptionRequestStore';
import toast from 'react-hot-toast';

export function useProfileData() {
  const user = useAuthStore((state) => state.user);
  const accessToken = useAuthStore((state) => state.accessToken);
  const fetchPets = usePetStore((state) => state.fetchPets);
  const updateStatus = useAdoptionRequestStore(
    (state) => state.updateRequestStatus
  );
  const adoptionRequests = useAdoptionRequestStore((state) => state.requests);
  const resetAlertCount = useAdoptionRequestStore(
    (state) => state.resetAlertCount
  );
  const markRequestsAsSeen = useAdoptionRequestStore(
    (state) => state.markRequestsAsSeen
  );

  const [userPets, setUserPets] = useState<Pet[]>([]);
  const [requests, setRequests] = useState<AdoptionRequest[]>([]);
  const [ownRequests, setOwnRequests] = useState<AdoptionRequest[]>([]);
  const [allPets, setAllPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch all owned pets + filter own pets
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

  // Requests received as owner
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

  // Requests as owner
  useEffect(() => {
    if (user?.name) {
      const fetchedOwnRequests = adoptionRequests.filter(
        (r) => r.requesterName === user.name
      );
      setOwnRequests(fetchedOwnRequests);
    }
  }, [user?.name, adoptionRequests]);

  // Update status
  const handleUpdate = async (
    petId: string,
    requesterName: string,
    status: 'approved' | 'declined'
  ) => {
    try {
      if (!accessToken) throw new Error('No token found');

      await updateAdoptionStatusApi(petId, status, accessToken);
      updateStatus(petId, requesterName, status);

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

  // Mark approved/declined requests as seen and reset alertCount
  useEffect(() => {
    if (user?.name) {
      const hasUnseenResponses = adoptionRequests.some(
        (r) =>
          r.requesterName === user.name &&
          (r.status === 'approved' || r.status === 'declined') &&
          !r.seenByRequester
      );

      if (hasUnseenResponses) {
        markRequestsAsSeen('requester', user.name);
        resetAlertCount();
      }
    }
  }, [user?.name, adoptionRequests, markRequestsAsSeen, resetAlertCount]);

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
