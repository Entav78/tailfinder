import { Outlet } from 'react-router-dom';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

/**
 * Layout component that wraps all pages with a common structure.
 * Includes Header at the top, Footer at the bottom, and an Outlet for nested routes.
 *
 * @returns {JSX.Element} The layout wrapper for the application
 */
const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background text-text-base dark:bg-dark-bg dark:text-text-soft">
      <Header />
      <main className="flex-grow p-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
