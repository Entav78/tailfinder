import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from '@/components/ThemeToggle/ThemeToggle';

// import logo from '@/assets/tailfinder-logo.png';
// ⬇️ Temp fallback

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  // ✅ Scroll lock
  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    // Just in case: remove it when component unmounts
    return () => document.body.classList.remove('overflow-hidden');
  }, [menuOpen]);

  return (
    <>
      <header className="bg-header text-white p-4 shadow-md relative z-50">
        {/* Logo + Hamburger */}
        <div className="flex items-center justify-between w-full">
          {/* Logo left on large screens, centered on small screens */}
          <div className="flex-1 sm:flex-none sm:mr-4 flex justify-center sm:justify-start">
            <img
              src="https://placekitten.com/100/100"
              alt="TailFinder Logo"
              className="h-20 w-auto rounded-full"
            />
          </div>

          {/* Hamburger button */}
          <button
            className="sm:hidden relative w-6 h-6 mr-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {/* Hamburger */}
            <svg
              className={`absolute inset-0 w-6 h-6 text-white transform transition-all duration-300 ${
                menuOpen
                  ? 'opacity-0 scale-75 rotate-45'
                  : 'opacity-100 scale-100'
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

            {/* X icon */}
            <svg
              className={`absolute inset-0 w-6 h-6 text-white transform transition-all duration-300 ${
                menuOpen
                  ? 'opacity-100 scale-100 rotate-0'
                  : 'opacity-0 scale-75 rotate-45'
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

          {/* Navigation (desktop only) */}
          <nav className="hidden sm:flex gap-6 text-lg font-medium pr-4">
            <Link to="/" className="hover:underline">
              Home
            </Link>
            <Link to="/profile" className="hover:underline">
              Profile
            </Link>
            <Link to="/register" className="hover:underline">
              Register
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      {/* Slide-in Sidebar (always in DOM) */}
      <div
        className={`fixed top-0 right-0 h-full w-full bg-header text-white shadow-lg transform transition-transform duration-300 z-50 sm:hidden ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center px-4 pt-6 pb-4 border-b border-white">
          <span className="text-lg font-semibold">Menu</span>
          <button onClick={() => setMenuOpen(false)} aria-label="Close menu">
            <svg
              className="w-6 h-6"
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
