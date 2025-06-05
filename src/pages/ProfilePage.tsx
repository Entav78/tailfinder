import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { getPetsUrl } from '@/constants/api';
import type { Pet } from '@/types/pet';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  const user = useAuthStore((state) => state.user);
  const [userPets, setUserPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);

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
        <ul className="space-y-2">
          {userPets.map((pet) => (
            <li
              key={pet.id}
              className="p-4 bg-white dark:bg-gray-800 rounded shadow"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">{pet.name}</p>
                  <p className="text-sm text-gray-500">{pet.breed}</p>
                </div>
                <Link
                  to={`/manage/${pet.id}`}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default ProfilePage;
