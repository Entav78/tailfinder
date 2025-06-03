import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLoginUrl } from '@/constants/api';
import type { LoginResponse } from '@/types/loginResponse';
import type { ErrorResponse } from '@/types/errorResponse';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

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

      localStorage.setItem('authToken', data.data.accessToken);
      localStorage.setItem(
        'user',
        JSON.stringify({ name: data.data.name, email: data.data.email })
      );
      localStorage.setItem('userName', data.data.name);

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
    }
  };

  return (
    <section className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </section>
  );
};

export default LoginPage;
