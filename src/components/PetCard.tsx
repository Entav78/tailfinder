import { useContext } from 'react';
import { RevealContext } from '@/context/RevealContext';
import type { Pet } from '@/types/pet';
import { Link } from 'react-router-dom';

interface PetCardProps {
  pet: Pet;
}

const PetCard = ({ pet }: PetCardProps) => {
  const context = useContext(RevealContext);

  if (!context) {
    throw new Error(
      'RevealContext is missing. Did you forget to wrap in <RevealProvider>?'
    );
  }

  const { revealImages } = context;

  const { id, name, description, image, breed, age, size, color } = pet;
  console.log('🐾 Image URL:', image);

  return (
    <Link to={`/pets/${id}`} className="block hover:opacity-90">
      <div className="border rounded-lg p-4 bg-white shadow">
        <h2 className="text-xl font-semibold">{name}</h2>

        {revealImages ? (
          <img
            src={image?.url || '/img/placeholder.jpg'}
            alt={image?.alt || `${name} the ${breed || 'pet'}`}
            className="w-full h-48 object-cover my-2 rounded"
          />
        ) : (
          <div className="w-full h-48 my-2 bg-gray-200 rounded flex items-center justify-center text-sm text-gray-500">
            Image hidden
          </div>
        )}

        <p className="text-sm text-gray-700">{description}</p>

        <div className="text-xs text-gray-600 mt-2">
          <p>
            <span className="font-semibold">Breed:</span> {breed}
          </p>
          <p>
            <span className="font-semibold">Age:</span> {age}
          </p>
          <p>
            <span className="font-semibold">Size:</span> {size} —{' '}
            <span className="font-semibold">Color:</span> {color}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default PetCard;
