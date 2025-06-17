import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
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

type AdoptionRequestInput = Omit<
  AdoptionRequest,
  'date' | 'seenByRequester' | 'seenByOwner'
>;

export interface AdoptionRequestStore {
  requests: AdoptionRequest[];
  setRequests: (requests: AdoptionRequest[]) => void;
  sendRequest: (request: AdoptionRequestInput) => void;
  getRequestsForPet: (petId: string) => AdoptionRequest[];
  getRequestsForOwner: (ownerName: string, pets: Pet[]) => AdoptionRequest[];
  updateRequestStatus: (
    petId: string,
    requesterName: string,
    status: 'approved' | 'declined'
  ) => void;
  markRequestsAsSeen: (type: 'owner' | 'requester', userName: string) => void;
  getAlertCountForUser: (userName: string) => number;
}

/**
 * Zustand store for managing adoption requests between users.
 *
 * Persists data using localStorage and supports devtools for debugging.
 *
 * Features:
 * - `sendRequest`: Submit a new adoption request
 * - `setRequests`: Overwrite the request array (e.g., from external source)
 * - `getRequestsForPet`: Retrieve all requests for a specific pet
 * - `getRequestsForOwner`: Filter requests for all pets owned by a specific user
 * - `updateRequestStatus`: Update the status of a request and mark it as seen by the owner
 * - `markRequestsAsSeen`: Mark requests as seen by owner or requester (used for alert counts)
 * - `getAlertCountForUser`: Returns how many unseen updates a user has (as owner/requester)
 *
 * Each request includes:
 * - `petId`, `requesterName`, `ownerName`, `message?`, `status`, `date`
 * - `seenByRequester`, `seenByOwner` for tracking notifications
 */
export const useAdoptionRequestStore = create<AdoptionRequestStore>()(
  devtools(
    persist(
      (set, get) => ({
        requests: [],

        setRequests: (requests) => set({ requests }),

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
          if (status === 'approved') {
            usePetStore.getState().updateAdoptionStatus(petId, 'Adopted');
          }

          set((state) => ({
            requests: state.requests.map((req) =>
              req.petId === petId && req.requesterName === requesterName
                ? {
                    ...req,
                    status,
                    seenByOwner: true,
                    updatedAt: new Date().toISOString(),
                  }
                : req
            ),
          }));
        },

        getAlertCountForUser: (userName: string) => {
          const requests = get().requests;

          const asOwner = requests.filter(
            (r) =>
              r.ownerName === userName &&
              r.status === 'pending' &&
              !r.seenByOwner
          );

          const asRequester = requests.filter(
            (r) =>
              r.requesterName === userName &&
              (r.status === 'approved' || r.status === 'declined') &&
              !r.seenByRequester
          );

          return asOwner.length + asRequester.length;
        },
      }),
      {
        name: 'adoption-requests-storage',
      }
    )
  )
);
