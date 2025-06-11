import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from '@/components/ThemeToggle/ThemeToggle';
import logo from '@/assets/img/logo-tailfinder.png';
import LogoutButton from '@/components/Buttons/LogoutButton';
import { useAuthStore } from '@/store/authStore';
import { useAdoptionRequestStore } from '@/store/adoptionRequestStore';

const Header = () => {
  const { accessToken } = useAuthStore();
  const user = useAuthStore((state) => state.user);

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', menuOpen);
    return () => document.body.classList.remove('overflow-hidden');
  }, [menuOpen]);

  const isLoggedIn = useAuthStore((state) => state.isLoggedIn());

  const alertCount = useAdoptionRequestStore((state) => state.alertCount);

  return (
    <>
      <header className="bg-header text-white px-4 py-6 shadow-md relative z-50">
        <div className="relative flex items-center justify-between w-full">
          {/* ✅ Logo small screens */}
          <div className="absolute left-1/2 transform -translate-x-1/2 sm:hidden">
            <Link to="/">
              <img
                src={logo}
                alt="TailFinder Logo"
                className="h-20 w-auto rounded-full"
              />
            </Link>
          </div>

          {/* ✅ Logo large screens */}
          <div className="hidden sm:block">
            <Link to="/">
              <img
                src={logo}
                alt="TailFinder Logo"
                className="h-20 w-auto rounded-full"
              />
            </Link>
          </div>

          {/* ✅ Hamburger */}
          <button
            className="sm:hidden relative w-12 h-12 p-2 ml-auto"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <svg
              className={`w-8 h-8 text-white transform transition-all duration-300 ${
                menuOpen ? 'opacity-0 scale-75' : 'opacity-100 scale-125'
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <svg
              className={`w-8 h-8 text-white transform transition-all duration-300 ${
                menuOpen ? 'opacity-100 scale-125' : 'opacity-0 scale-90'
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            {isLoggedIn && alertCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {alertCount}
              </span>
            )}
          </button>

          {/* ✅ Desktop Nav */}
          <nav className="hidden sm:flex gap-6 text-lg font-medium pr-4 items-center">
            <Link to="/" className="hover:underline">
              Home
            </Link>
            <Link to="/profile" className="hover:underline relative">
              Profile
              {isLoggedIn && alertCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {alertCount}
                </span>
              )}
            </Link>
            <Link to="/manage" className="hover:underline">
              Manage
            </Link>
            <ThemeToggle />

            {accessToken ? (
              <LogoutButton />
            ) : (
              <>
                <Link to="/login" className="hover:underline">
                  Login
                </Link>
                <Link to="/register" className="hover:underline">
                  Register
                </Link>
              </>
            )}
          </nav>
        </div>
        {/* ✅ Logged in user (desktop only) */}
        {user && (
          <div className="hidden sm:flex justify-end text-sm text-white/70 mt-1 pr-4">
            Logged in as <span className="font-semibold ml-1">{user.name}</span>
          </div>
        )}
      </header>

      {/* ✅ Mobile Menu */}
      <div
        id="mobile-menu"
        className={`fixed top-0 right-0 h-full w-full bg-header text-white shadow-lg transform transition-transform duration-300 z-50 sm:hidden ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center px-4 pt-6 pb-4 border-b border-white">
          <span className="text-lg font-semibold">Menu</span>
          <button onClick={() => setMenuOpen(false)} aria-label="Close menu">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <ul className="flex flex-col gap-4 p-4">
          <li>
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="hover:underline"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              onClick={() => setMenuOpen(false)}
              className="hover:underline relative"
            >
              Profile
              {isLoggedIn && alertCount > 0 && (
                <span className="absolute -top-2 -right-4 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {alertCount}
                </span>
              )}
            </Link>
          </li>
          <li>
            <Link
              to="/manage"
              onClick={() => setMenuOpen(false)}
              className="hover:underline"
            >
              Manage
            </Link>
          </li>

          {accessToken ? (
            <li>
              <LogoutButton onClickDone={() => setMenuOpen(false)} />
            </li>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="hover:underline"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="hover:underline"
                >
                  Register
                </Link>
              </li>
            </>
          )}

          <li className="pt-4 border-t border-white">
            <ThemeToggle onClickDone={() => setMenuOpen(false)} />
          </li>

          {/* ✅ Logged in user (mobile) */}
          {user?.name && (
            <li className="pt-2 text-sm text-gray-300">
              Logged in as <span className="font-semibold">{user.name}</span>
            </li>
          )}
        </ul>
      </div>
    </>
  );
};

export default Header;
