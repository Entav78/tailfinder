import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLoginUrl } from '@/constants/api';
import type { LoginResponse } from '@/types/loginResponse';
import type { ErrorResponse } from '@/types/errorResponse';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/Buttons/Button/Button';

/**
 * @component LoginPage
 * Renders the login form for users to authenticate into the application.
 *
 * - Accepts user input for email and password
 * - Submits a POST request to the login API endpoint
 * - Displays validation and error messages
 * - On successful login, updates the auth store and redirects to the homepage
 *
 * @returns {JSX.Element} A form interface for user login
 */

const LoginPage = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch(getLoginUrl(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const json: LoginResponse | ErrorResponse = await response.json();

      if (!response.ok) {
        const errorData = json as ErrorResponse;
        throw new Error(errorData.errors?.[0]?.message || 'Login failed');
      }

      const data = json as LoginResponse;

      login({
        name: data.data.name,
        email: data.data.email,
        accessToken: data.data.accessToken,
      });

      toast.success('Logged in successfully!');

      navigate('/');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
        toast.error(err.message || 'Login failed');
      } else {
        setError('Something went wrong');
        toast.error('Something went wrong');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="max-w-md mx-auto p-4">
      <div className="form-container">
        <h1 className="heading-xl">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
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

          <Button
            type="submit"
            variant="form"
            disabled={isLoading}
            className={`w-full ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? '🔄 Logging in...' : 'Login'}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
