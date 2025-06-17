import { API_PETS } from '@/constants/api';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Pet } from '@/types/pet';

interface PetStore {
  pets: Pet[];
  fetchPets: () => Promise<void>;
  setPets: (pets: Pet[]) => void;
  updateAdoptionStatus: (
    petId: string,
    status: 'Available' | 'Adopted'
  ) => void;
}

/**
 * Zustand store for managing pet data.
 *
 * Persists the list of pets using localStorage.
 *
 * Features:
 * - `fetchPets`: Fetches pets from the API and stores them in state
 * - `setPets`: Manually sets the list of pets
 * - `updateAdoptionStatus`: Updates the adoption status of a specific pet
 *
 * State shape:
 * - `pets`: Array of pet objects
 */
export const usePetStore = create<PetStore>()(
  persist(
    (set) => ({
      pets: [],

      fetchPets: async () => {
        try {
          const res = await fetch(API_PETS);
          const data = await res.json();
          set({ pets: data.data || [] });
        } catch (err) {
          console.error('Failed to fetch pets', err);
        }
      },

      setPets: (pets) => set({ pets }),

      updateAdoptionStatus: (petId, status) =>
        set((state) => ({
          pets: state.pets.map((p) =>
            p.id === petId ? { ...p, adoptionStatus: status } : p
          ),
        })),
    }),
    {
      name: 'pet-storage',
    }
  )
);
