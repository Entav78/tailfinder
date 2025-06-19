import { useProfileData } from '@/hooks/useProfileData';
import OwnAdoptionRequests from '@/components/Profile/OwnAdoptionRequests';
import YourPetCard from '@/components/Profile/YourPetCard';

/**
 * @component ProfilePage
 * Displays the logged-in user's profile information, including:
 * - Basic details (name, email)
 * - List of pets added by the user
 * - Incoming adoption requests for the user's pets
 * - Adoption requests made by the user
 *
 * Uses `useProfileData` hook to load user data and requests.
 *
 * @returns {JSX.Element} The profile page with pet management and request sections
 */
const ProfilePage = () => {
  const {
    user,
    loading,
    userPets,
    requests,
    ownRequests,
    allPets,
    handleUpdate,
  } = useProfileData();

  return (
    <section className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Profile</h1>

      {user && (
        <div className="mb-6 text-sm text-text-base dark:text-text-base-dark">
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </div>
      )}

      <h2 className="text-xl font-semibold mb-2">Your Pets</h2>

      {loading ? (
        <p>Loading your pets...</p>
      ) : userPets.length === 0 ? (
        <p>You haven’t added any pets yet.</p>
      ) : (
        <div className="space-y-4">
          {userPets.map((pet) => (
            <YourPetCard
              key={pet.id}
              pet={pet}
              requests={requests}
              handleUpdate={handleUpdate}
            />
          ))}
        </div>
      )}

      <h2 className="text-xl font-semibold mt-6 mb-2">
        Your Adoption Requests
      </h2>
      <OwnAdoptionRequests ownRequests={ownRequests} allPets={allPets} />
    </section>
  );
};

export default ProfilePage;
