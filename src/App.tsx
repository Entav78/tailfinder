import { Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout/Layout';
import HomePage from './pages/HomePage';
import PetDetailPage from '@/pages/PetDetailPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/pets/:id" element={<PetDetailPage />} />
        <Route path="account/login" element={<LoginPage />} />
      </Route>
    </Routes>
  );
}

export default App;
