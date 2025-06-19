import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRegisterUrl } from '@/constants/api';
import toast from 'react-hot-toast';
import { Button } from '@/components/Buttons/Button/Button';

/**
 * @component RegisterPage
 * Renders the registration form for new users.
 *
 * Features:
 * - Input fields for name, email, and password
 * - Validates and submits the form via Noroff's `/auth/register` endpoint
 * - Displays success toast and redirects to login on success
 * - Shows error messages if registration fails
 *
 * @returns {JSX.Element} The registration page component
 */
const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch(getRegisterUrl(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.errors?.[0]?.message || 'Registration failed');
      }

      toast.success('Registration successful! Please log in.');

      navigate('/login');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
        toast.error(err.message);
      } else {
        setError('An unexpected error occurred.');
        toast.error('An unexpected error occurred.');
      }
    }
  };

  return (
    <section className="max-w-md mx-auto p-4">
      <div className="form-container">
        <h1 className="heading-xl">Register</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="form-label">Name</label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="input-field"
            />
          </div>

          <div>
            <label className="form-label">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-field"
            />
          </div>

          <div>
            <label className="form-label">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input-field"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button type="submit" variant="form">
            Register
          </Button>
        </form>
      </div>
    </section>
  );
};

export default RegisterPage;
