import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { Pet } from '@/types/pet';

export interface AdoptionRequest {
  petId: string;
  requesterName: string;
  message?: string;
  status: 'pending' | 'approved' | 'declined';
  date: string;
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
          { ...request, date: new Date().toISOString() },
        ],
      })),
    getRequestsForPet: (petId: string) =>
      get().requests.filter((r) => r.petId === petId),
    getRequestsForOwner: (ownerName, pets) =>
      get().requests.filter((req) => {
        const pet = pets.find((p) => p.id === req.petId);
        return pet?.owner?.name === ownerName;
      }),
    updateRequestStatus: (petId, requesterName, status) =>
      set((state) => ({
        requests: state.requests.map((req) =>
          req.petId === petId && req.requesterName === requesterName
            ? { ...req, status }
            : req
        ),
      })),
  }))
);
