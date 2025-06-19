// Mock Zustand stores
vi.mock('@/store/authStore', () => ({
  useAuthStore: vi.fn(),
}));

vi.mock('@/store/adoptionRequestStore', () => ({
  useAdoptionRequestStore: vi.fn(),
}));

import { render, fireEvent, screen } from '@testing-library/react';
import { describe, it, vi, expect, beforeEach } from 'vitest';
import { AdoptButton } from './AdoptButton';
import type { Pet } from '@/types/pet';

// Import mocks
import { useAuthStore } from '@/store/authStore';
import { useAdoptionRequestStore } from '@/store/adoptionRequestStore';

describe('AdoptButton', () => {
  const mockSendRequest = vi.fn();

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

    // Mock user and store behavior
    (useAuthStore as unknown as vi.Mock).mockReturnValue({
      user: { name: 'BruceWayne' },
    });

    (useAdoptionRequestStore as unknown as vi.Mock).mockReturnValue({
      sendRequest: mockSendRequest,
    });

    // Optional: silence the alert for test runs
    vi.spyOn(window, 'alert').mockImplementation(() => {});
  });

  it('renders and calls sendRequest on click', () => {
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
