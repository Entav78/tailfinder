import { useAuthStore } from '@/store/authStore';
import { useEffect, useState } from 'react';
import { getPetsUrl } from '@/constants/api';
import type { Pet } from '@/types/pet';

const ProfilePage = () => {
  const user = useAuthStore((state) => state.user);

  const name = user?.name;
  const email = user?.email;

  const [userPets, setUserPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserPets = async () => {
      try {
        const res = await fetch(getPetsUrl());
        const json = await res.json();
        const allPets: Pet[] = json.data;

        // Filtrer på brukernavn
        const filtered = allPets.filter((pet) => pet.owner?.name === name);
        setUserPets(filtered);
      } catch (err) {
        console.error('Failed to fetch pets:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPets();
  }, [name]);

  return (
    <section className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-2">My Profile</h1>
      <p className="text-lg mb-4">
        {name} — {email}
      </p>

      <h2 className="text-xl font-semibold mb-2">My Pets</h2>
      {loading ? (
        <p>Loading pets...</p>
      ) : userPets.length === 0 ? (
        <p>You haven’t added any pets yet.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {userPets.map((pet) => (
            <li key={pet.id} className="border rounded p-4 bg-white shadow">
              <h3 className="font-bold text-lg">{pet.name}</h3>
              <p className="text-sm text-gray-600">{pet.breed}</p>
              <p className="text-sm">{pet.age} years old</p>
              <p className="text-sm text-gray-700">{pet.description}</p>
              {/* Her kan du legge til Edit / Delete knapper senere */}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default ProfilePage;
