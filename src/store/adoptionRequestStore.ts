import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { Pet } from '@/types/pet';
import { usePetStore } from './petStore';

export interface AdoptionRequest {
  petId: string;
  requesterName: string;
  ownerName: string;
  message?: string;
  status: 'pending' | 'approved' | 'declined';
  date: string;
  seenByRequester?: boolean;
  seenByOwner?: boolean;
}

type AdoptionRequestInput = Omit<AdoptionRequest, 'date'>;

export interface AdoptionRequestStore {
  requests: AdoptionRequest[];
  sendRequest: (request: AdoptionRequestInput) => void;
  getRequestsForPet: (petId: string) => AdoptionRequest[];
  getRequestsForOwner: (ownerName: string, pets: Pet[]) => AdoptionRequest[];
  updateRequestStatus: (
    petId: string,
    requesterName: string,
    status: 'approved' | 'declined'
  ) => void;
}

export const useAdoptionRequestStore = create<AdoptionRequestStore>()(
  devtools((set, get) => ({
    requests: [],

    sendRequest: (request) =>
      set((state) => ({
        requests: [
          ...state.requests,
          {
            ...request,
            date: new Date().toISOString(),
            seenByRequester: false,
            seenByOwner: false,
          },
        ],
      })),

    markRequestsAsSeen: (type: 'owner' | 'requester', userName: string) => {
      set((state) => ({
        requests: state.requests.map((r) => {
          if (
            (type === 'owner' &&
              r.ownerName === userName &&
              r.status === 'pending') ||
            (type === 'requester' &&
              r.requesterName === userName &&
              (r.status === 'approved' || r.status === 'declined'))
          ) {
            return {
              ...r,
              ...(type === 'owner'
                ? { seenByOwner: true }
                : { seenByRequester: true }),
            };
          }
          return r;
        }),
      }));
    },

    getRequestsForPet: (petId: string) =>
      get().requests.filter((r) => r.petId === petId),

    getRequestsForOwner: (ownerName, pets) =>
      get().requests.filter((req) => {
        const pet = pets.find((p) => p.id === req.petId);
        return pet?.owner?.name === ownerName;
      }),

    updateRequestStatus: (petId, requesterName, status) => {
      // ✅ Hvis approved: oppdater adoptionStatus til Adopted
      if (status === 'approved') {
        usePetStore.getState().updateAdoptionStatus(petId, 'Adopted');
      }

      set((state) => ({
        requests: state.requests.map((req) =>
          req.petId === petId && req.requesterName === requesterName
            ? {
                ...req,
                status,
                updatedAt: new Date().toISOString(),
              }
            : req
        ),
      }));
    },
  }))
);
