import { Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout/Layout';
import HomePage from './pages/HomePage';
import PetDetailPage from '@/pages/PetDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import { Toaster } from 'react-hot-toast';
import ManagePetPage from './pages/ManagePetPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/pets/:id" element={<PetDetailPage />} />
          <Route path="/manage" element={<ManagePetPage />} /> {/* Add new */}
          <Route path="/manage/:id" element={<ManagePetPage />} /> {/* Edit */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Routes>
      <Toaster position="top-right" />
    </>
  );
}

export default App;
