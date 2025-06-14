import { Outlet } from 'react-router-dom';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

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
