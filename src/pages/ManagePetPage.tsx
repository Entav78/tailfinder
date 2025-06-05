import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import toast from 'react-hot-toast';
import { getPetByIdUrl, getPetsUrl } from '@/constants/api';
import type { Pet } from '@/types/pet';

const ManagePetPage = () => {
  const { id } = useParams(); // Bruk kun denne, ikke destrukturer på nytt senere
  const navigate = useNavigate();

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
    adoptionStatus: 'Available', // optional, men setter default
    location: '',
    image: {
      url: '',
      alt: '',
    },
  });

  const [loading, setLoading] = useState(false);

  // Fetch pet data if editing
  useEffect(() => {
    if (!id) return;
    setLoading(true);

    fetch(getPetByIdUrl(id))
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          const currentUser = useAuthStore.getState().user?.name;

          // Check if current user is the owner
          if (data.data.owner && data.data.owner !== currentUser) {
            toast.error("You don't have permission to edit this pet.");
            navigate('/');
            return; // stop execution
          }

          // User is allowed
          setFormData(data.data);
        } else {
          toast.error('Could not fetch pet details');
        }
      })
      .catch(() => toast.error('Something went wrong'))
      .finally(() => setLoading(false));
  }, [id, navigate]);

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
    setLoading(true);

    const url = id ? getPetByIdUrl(id) : getPetsUrl();
    const method = id ? 'PUT' : 'POST';
    const token = useAuthStore.getState().accessToken;
    const apiKey = import.meta.env.VITE_API_KEY;

    // Fjern id ved POST
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
          'X-Noroff-API-Key': apiKey,
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
      setLoading(false);
    }
  };

  return (
    <section className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        {id ? 'Edit Pet' : 'Add New Pet'}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          name="breed"
          placeholder="Breed"
          value={formData.breed}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          name="species"
          placeholder="Species (e.g., dog, cat)"
          value={formData.species}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          name="gender"
          placeholder="Gender (e.g., male, female)"
          value={formData.gender}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <input
          name="age"
          type="number"
          placeholder="Age"
          value={formData.age === 0 ? '' : formData.age}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          name="size"
          placeholder="Size"
          value={formData.size}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          name="color"
          placeholder="Color"
          value={formData.color}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          name="image.url"
          placeholder="Image URL"
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
          className="w-full p-2 border rounded"
        />
        <input
          name="image.alt"
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
          className="w-full p-2 border rounded"
        />
        <input
          name="adoptionStatus"
          placeholder="Adoption Status"
          value={formData.adoptionStatus}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Saving...' : id ? 'Update Pet' : 'Add Pet'}
        </button>
      </form>
    </section>
  );
};

export default ManagePetPage;
