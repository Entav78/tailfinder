import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { getPetsUrl } from '@/constants/api';
import type { Pet } from '@/types/pet';
import type { AdoptionRequest } from '@/store/adoptionRequestStore';
import { Link } from 'react-router-dom';
import { useAdoptionRequestStore } from '@/store/adoptionRequestStore';
import { Button } from '@/components/Buttons/Button';

const ProfilePage = () => {
  const user = useAuthStore((state) => state.user);
  const [userPets, setUserPets] = useState<Pet[]>([]);
  const [requests, setRequests] = useState<AdoptionRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const updateStatus = useAdoptionRequestStore(
    (state) => state.updateRequestStatus
  );

  const handleUpdate = (
    petId: string,
    requesterName: string,
    status: 'approved' | 'declined'
  ) => {
    updateStatus(petId, requesterName, status);
  };

  useEffect(() => {
    const fetchUserPets = async () => {
      try {
        const res = await fetch(getPetsUrl());
        const json = await res.json();
        const allPets: Pet[] = json.data;

        const filtered = allPets.filter(
          (pet) => pet.owner?.name === user?.name
        );

        setUserPets(filtered);
      } catch (err) {
        console.error('Failed to fetch pets:', err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.name) {
      fetchUserPets();
    }
  }, [user?.name]);

  useEffect(() => {
    if (user?.name && userPets.length > 0) {
      const fetchedRequests = useAdoptionRequestStore
        .getState()
        .getRequestsForOwner(user.name, userPets);
      setRequests(fetchedRequests);
    }
  }, [user?.name, userPets]);

  return (
    <section className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Profile</h1>

      {user && (
        <div className="mb-6 text-sm text-gray-700 dark:text-gray-300">
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </div>
      )}

      <h2 className="text-xl font-semibold mb-2">Your Pets</h2>

      {loading ? (
        <p>Loading your pets...</p>
      ) : userPets.length === 0 ? (
        <p>You haven’t added any pets yet.</p>
      ) : (
        <div className="space-y-4">
          {userPets.map((pet) => (
            <div
              key={pet.id}
              className="p-4 bg-white dark:bg-gray-800 rounded shadow"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold text-lg">{pet.name}</p>
                  <p className="text-sm text-gray-500">{pet.breed}</p>
                </div>
                <Link to={`/manage/${pet.id}`}>
                  <Button variant="secondary">Edit</Button>
                </Link>
              </div>

              {requests
                .filter((r) => r.petId === pet.id)
                .map((r) => (
                  <div
                    key={r.requesterName}
                    className="mt-4 p-3 border rounded bg-gray-50 dark:bg-gray-700"
                  >
                    <p className="text-sm mb-1">
                      <strong>{r.requesterName}</strong> wants to adopt this
                      pet.
                    </p>
                    <div className="flex gap-2">
                      <Button
                        variant="primary"
                        onClick={() =>
                          handleUpdate(pet.id, r.requesterName, 'approved')
                        }
                      >
                        Approve
                      </Button>
                      <Button
                        variant="reveal"
                        onClick={() =>
                          handleUpdate(pet.id, r.requesterName, 'declined')
                        }
                      >
                        Decline
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ProfilePage;
