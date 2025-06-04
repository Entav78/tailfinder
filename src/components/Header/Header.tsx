import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from '@/components/ThemeToggle/ThemeToggle';

import logo from '@/assets/img/logo-tailfinder.png';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => document.body.classList.remove('overflow-hidden');
  }, [menuOpen]);

  return (
    <>
      <header className="bg-header text-white px-4 py-6 shadow-md relative z-50">
        <div className="relative flex items-center justify-between w-full">
          {/* ✅ Logo for small screens (absolute + centered) */}
          <div className="absolute left-1/2 transform -translate-x-1/2 sm:hidden">
            <img
              src={logo}
              alt="TailFinder Logo"
              className="h-20 w-auto rounded-full"
            />
          </div>

          {/* ✅ Logo for larger screens */}
          <div className="hidden sm:block">
            <img
              src={logo}
              alt="TailFinder Logo"
              className="h-20 w-auto rounded-full"
            />
          </div>

          {/* Hamburger */}
          <button
            className="sm:hidden relative w-12 h-12 p-2 ml-auto"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {/* Hamburger Icon */}
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

            {/* X Icon */}
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
          </button>

          {/* Desktop Nav */}
          <nav className="hidden sm:flex gap-6 text-lg font-medium pr-4">
            <Link to="/" className="hover:underline">
              Home
            </Link>
            <Link to="/profile" className="hover:underline">
              Profile
            </Link>
            <Link to="/manage" className="hover:underline">
              Manage
            </Link>
            <Link to="/register" className="hover:underline">
              Register
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      {/* Mobile Slide-in Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-full bg-header text-white shadow-lg transform transition-transform duration-300 z-50 sm:hidden ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        id="mobile-menu"
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
              className="hover:underline"
            >
              Profile
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
          <li>
            <Link
              to="/register"
              onClick={() => setMenuOpen(false)}
              className="hover:underline"
            >
              Register
            </Link>
          </li>
          <li className="pt-4 border-t border-white">
            <ThemeToggle onClickDone={() => setMenuOpen(false)} />
          </li>
        </ul>
      </div>
    </>
  );
};

export default Header;
