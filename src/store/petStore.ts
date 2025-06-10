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
      name: 'pet-storage', // lokalStorage-key
    }
  )
);
