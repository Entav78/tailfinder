import { create } from 'zustand';

interface AdoptionRequest {
  petId: string;
  petName: string;
  ownerName: string;
  requesterName: string;
  status: 'pending' | 'accepted' | 'declined';
}

interface AdoptionStore {
  requests: AdoptionRequest[];
  sendRequest: (request: AdoptionRequest) => void;
  getRequestsByOwner: (ownerName: string) => AdoptionRequest[];
  getRequestsByUser: (requesterName: string) => AdoptionRequest[];
  updateStatus: (
    petId: string,
    requesterName: string,
    status: 'accepted' | 'declined'
  ) => void;
}

export const useAdoptionStore = create<AdoptionStore>((set, get) => ({
  requests: [],

  sendRequest: (request) =>
    set((state) => ({ requests: [...state.requests, request] })),

  getRequestsByOwner: (ownerName) =>
    get().requests.filter((r) => r.ownerName === ownerName),

  getRequestsByUser: (requesterName) =>
    get().requests.filter((r) => r.requesterName === requesterName),

  updateStatus: (petId, requesterName, status) =>
    set((state) => ({
      requests: state.requests.map((r) =>
        r.petId === petId && r.requesterName === requesterName
          ? { ...r, status }
          : r
      ),
    })),
}));
