import { render, fireEvent, screen } from '@testing-library/react';
import { describe, it, vi, expect, beforeEach } from 'vitest';
import { AdoptButton } from './AdoptButton';
import type { Pet } from '@/types/pet';

// ✅ Mocker Zustand hooks med selector-støtte
vi.mock('@/store/authStore', async () => {
  return {
    useAuthStore: vi.fn().mockImplementation((selector) =>
      selector({
        user: { name: 'BruceWayne' },
      })
    ),
  };
});

vi.mock('@/store/adoptionRequestStore', async () => {
  return {
    useAdoptionRequestStore: vi.fn().mockImplementation((selector) =>
      selector({
        sendRequest: vi.fn(),
      })
    ),
  };
});

import { useAdoptionRequestStore } from '@/store/adoptionRequestStore';

describe('AdoptButton', () => {
  const mockPet: Pet = {
    id: 'pet123',
    name: 'Buddy',
    species: 'Dog',
    breed: 'Golden Retriever',
    age: 3,
    gender: 'male',
    size: 'medium',
    color: 'golden',
    location: 'Oslo',
    description: 'Friendly dog',
    image: {
      url: 'https://example.com/dog.jpg',
      alt: 'Dog image',
    },
    adoptionStatus: 'available',
    owner: {
      name: 'OwnerName',
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(window, 'alert').mockImplementation(() => {});
  });

  it('renders and calls sendRequest on click', () => {
    const mockSendRequest = vi.fn();

    // @ts-expect-error Zustand selector mocking
    (useAdoptionRequestStore as vi.Mock).mockImplementation((selector) =>
      selector({
        sendRequest: mockSendRequest,
      })
    );

    render(<AdoptButton pet={mockPet} />);

    const button = screen.getByRole('button', { name: /adopt/i });
    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    expect(mockSendRequest).toHaveBeenCalledWith({
      petId: 'pet123',
      requesterName: 'BruceWayne',
      ownerName: 'OwnerName',
      status: 'pending',
    });
  });
});
