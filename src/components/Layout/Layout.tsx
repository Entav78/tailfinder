import { Outlet } from 'react-router-dom';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background text-gray-800 dark:bg-gray-900 dark:text-white">
      <Header />
      <main className="flex-grow p-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
