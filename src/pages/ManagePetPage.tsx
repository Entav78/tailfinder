import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import toast from 'react-hot-toast';
import { getPetByIdUrl, getPetsUrl } from '@/constants/api';
import type { Pet } from '@/types/pet';
import { DeleteButton } from '@/components/Buttons/DeleteButton';
import { Button } from '@/components/Buttons/Button/Button';
import { NOROFF_API_KEY } from '@/constants/api';

/**
 * @component ManagePetPage
 * Provides a form interface for adding a new pet or editing an existing pet.
 *
 * - If an `id` param is present, fetches pet data for editing
 * - Allows form input for pet details such as name, age, species, and appearance
 * - Handles submission via POST (create) or PUT (update)
 * - On successful submission, displays toast feedback and redirects
 * - If editing, provides an option to delete the pet
 *
 * @returns {JSX.Element} The form section for creating or editing a pet profile
 */
const ManagePetPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState<Pet>({
    id: '',
    name: '',
    species: '',
    breed: '',
    age: 0,
    gender: '',
    size: '',
    color: '',
    description: '',
    adoptionStatus: 'Available',
    location: '',
    image: {
      url: '',
      alt: '',
    },
  });

  //const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    setIsLoading(true);

    fetch(getPetByIdUrl(id))
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setFormData(data.data);
        } else {
          toast.error('Could not fetch pet details');
        }
      })
      .catch(() => toast.error('Something went wrong'))
      .finally(() => setIsLoading(false)); // 👈 ikke setLoading
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'age' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const url = id ? getPetByIdUrl(id) : getPetsUrl();
    const method = id ? 'PUT' : 'POST';
    const token = useAuthStore.getState().accessToken;

    const payload = id
      ? formData
      : // eslint-disable-next-line @typescript-eslint/no-unused-vars
        (({ id: _, ...rest }: Pet): Omit<Pet, 'id'> => rest)(formData);

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          'X-Noroff-API-Key': NOROFF_API_KEY,
        },
        body: JSON.stringify({
          ...payload,
          image: payload.image?.url ? payload.image : undefined,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.errors?.[0]?.message || 'Failed to save pet');
      }

      toast.success(
        id ? 'Pet updated successfully!' : 'Pet added successfully!'
      );
      navigate('/');
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        {id ? 'Edit Pet' : 'Add New Pet'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="heading-md mt-4 mb-2">Basic Info</h2>
        <div>
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            id="name"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="input-field"
          />
        </div>
        <div>
          <label htmlFor="breed" className="form-label">
            Breed
          </label>
          <input
            id="breed"
            name="breed"
            placeholder="Breed"
            value={formData.breed}
            onChange={handleChange}
            required
            className="input-field"
          />
        </div>
        <div>
          <label htmlFor="species" className="form-label">
            Species
          </label>
          <input
            id="species"
            name="species"
            placeholder="Species (e.g., dog, cat)"
            value={formData.species}
            onChange={handleChange}
            required
            className="input-field"
          />
        </div>
        <div>
          <label htmlFor="gender" className="form-label">
            Gender
          </label>
          <input
            id="gender"
            name="gender"
            placeholder="Gender (e.g., male, female)"
            value={formData.gender}
            onChange={handleChange}
            required
            className="input-field"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="age" className="form-label">
            Age
          </label>
          <input
            id="age"
            name="age"
            type="number"
            placeholder="Age"
            value={formData.age === 0 ? '' : formData.age}
            onChange={handleChange}
            required
            className="input-field"
          />
        </div>
        <div className="mt-8">
          <h2 className="heading-md mt-6">Appearance</h2>
        </div>
        <div>
          <label htmlFor="size" className="form-label">
            Size
          </label>
          <input
            id="size"
            name="size"
            placeholder="Size"
            value={formData.size}
            onChange={handleChange}
            required
            className="input-field"
          />
        </div>
        <div>
          <label htmlFor="color" className="form-label">
            Color
          </label>
          <input
            id="color"
            name="color"
            placeholder="Color"
            value={formData.color}
            onChange={handleChange}
            required
            className="input-field"
          />
        </div>
        <div>
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="input-field"
          />
        </div>
        <div>
          <label htmlFor="location" className="form-label">
            Location
          </label>
          <input
            id="location"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            required
            className="input-field"
          />
        </div>
        <div className="mt-8">
          <h2 className="heading-md mt-6">Adoption & Image</h2>
        </div>
        <div>
          <label htmlFor="image-url" className="form-label">
            Image URL
          </label>
          <input
            id="image-url"
            name="image-url"
            placeholder="Must start with https://"
            value={formData.image?.url || ''}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                image: {
                  url: e.target.value,
                  alt: prev.image?.alt || '',
                },
              }))
            }
            className="input-field"
          />
        </div>
        <div>
          <label htmlFor="image-alt" className="form-label">
            Image Alt Text
          </label>
          <input
            id="image-alt"
            name="image-alt"
            placeholder="Image Alt Text"
            value={formData.image?.alt || ''}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                image: {
                  url: prev.image?.url || '',
                  alt: e.target.value,
                },
              }))
            }
            className="input-field"
          />
        </div>
        <div>
          <label htmlFor="adoptionStatus" className="form-label">
            Adoption Status
          </label>
          <input
            id="adoptionStatus"
            name="adoptionStatus"
            placeholder="Adoption Status"
            value={formData.adoptionStatus}
            onChange={handleChange}
            className="input-field"
          />
        </div>
        <div className="flex gap-4 justify-end">
          <Button
            type="submit"
            variant="primary"
            disabled={isLoading}
            className={`w-full ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading
              ? id
                ? '🔄 Updating Pet...'
                : '🔄 Adding Pet...'
              : id
              ? 'Update Pet'
              : 'Add Pet'}
          </Button>

          {id && (
            <DeleteButton
              petId={formData.id}
              onDeleted={() => navigate('/profile')}
            />
          )}
        </div>
      </form>
    </section>
  );
};

export default ManagePetPage;
