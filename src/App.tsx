import { Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout/Layout';
import HomePage from './pages/HomePage';
import PetDetailPage from '@/pages/PetDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import { Toaster } from 'react-hot-toast';
import ManagePetPage from './pages/ManagePetPage';
import ProtectedRoute from '@/components/ProtectedRoute';
import ProfilePage from './pages/ProfilePage';
import ErrorPage from './pages/ErrorPage';

/**
 * Root component of the application.
 *
 * @remarks
 * - Wraps all routes with a shared `Layout` component.
 * - Uses `react-router-dom` for client-side routing.
 * - Protects `/profile`, `/manage`, and `/manage/:id` routes using `ProtectedRoute`.
 * - Integrates `react-hot-toast` for global toast notifications.
 *
 * @returns The app's route structure with shared layout and toast handler.
 */
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/pets/:id" element={<PetDetailPage />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/manage"
            element={
              <ProtectedRoute>
                <ManagePetPage />
              </ProtectedRoute>
            }
          />{' '}
          <Route
            path="/manage/:id"
            element={
              <ProtectedRoute>
                <ManagePetPage />
              </ProtectedRoute>
            }
          />{' '}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
      <Toaster position="top-right" />
    </>
  );
}

export default App;
