import { Link } from 'react-router-dom';
import { Button } from '@/components/Buttons/Button';
import type { Pet } from '@/types/pet';
import type { AdoptionRequest } from '@/store/adoptionRequestStore';
import AdoptionRequestSummary from './AdoptionRequestSummary';
import AdoptionRequestCard from './AdoptionRequestCard';

interface Props {
  pet: Pet;
  requests: AdoptionRequest[];
  handleUpdate: (
    petId: string,
    requesterName: string,
    status: 'approved' | 'declined'
  ) => void;
}

const YourPetCard = ({ pet, requests, handleUpdate }: Props) => {
  const petRequests = requests.filter((r) => r.petId === pet.id);

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
      <div className="flex justify-between items-center">
        <div>
          <p className="font-semibold text-lg">{pet.name}</p>
          <p className="text-sm text-gray-500">{pet.breed}</p>
          <AdoptionRequestSummary pet={pet} requests={requests} />
        </div>

        <Link to={`/manage/${pet.id}`}>
          <Button variant="secondary">Edit</Button>
        </Link>
      </div>

      {petRequests.map((r) => (
        <AdoptionRequestCard
          key={r.requesterName}
          request={r}
          onUpdate={(status) => handleUpdate(pet.id, r.requesterName, status)}
        />
      ))}
    </div>
  );
};

export default YourPetCard;
