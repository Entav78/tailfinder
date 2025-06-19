import { render, screen } from '@testing-library/react';
import { it, expect, beforeEach, vi } from 'vitest';
import { PetCard } from './PetCard';
import { MemoryRouter } from 'react-router-dom';
import { usePetStore } from '@/store/petStore';
import type { Pet } from '@/types/pet';
import { RevealContext } from '@/context/RevealContext';

const mockPet: Pet = {
  id: '1',
  name: 'Spider-Man',
  species: 'Superhero',
  breed: 'Mutant Spider',
  age: 2,
  gender: 'male',
  size: 'small',
  color: 'red',
  location: 'NYC',
  description: 'Friendly neighborhood Spider-Man',
  adoptionStatus: 'available',
  image: {
    url: 'https://example.com/spidey.jpg',
    alt: 'Heroic Spider',
  },
  owner: {
    name: 'Hilde',
  },
};

beforeEach(() => {
  usePetStore.setState({ pets: [mockPet] });
});

it('renders correct pet name and image', () => {
  render(
    <MemoryRouter>
      <RevealContext.Provider
        value={{ revealImages: true, setRevealImages: vi.fn() }}
      >
        <PetCard pet={mockPet} />
      </RevealContext.Provider>
    </MemoryRouter>
  );

  expect(screen.getByText('Spider-Man')).toBeInTheDocument();
  expect(screen.getByAltText('Heroic Spider')).toBeInTheDocument();
});
