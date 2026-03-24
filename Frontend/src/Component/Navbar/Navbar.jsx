import logo from '../../Assets/Frontend_Assets/logo.png';
import cart_icon from '../../Assets/Frontend_Assets/cart_icon.png';
import { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import { useUser, UserButton } from '@clerk/clerk-react';

const Navbar = () => {
  const location = useLocation();
  const getActive = () => {
    const path = location.pathname;
    if (path === '/') return 'shop';
    if (path.startsWith('/mens')) return 'mens';
    if (path.startsWith('/womens')) return 'womens';
    if (path.startsWith('/kids')) return 'kids';
    return '';
  };

  const [menuOpen, setMenuOpen] = useState(false);
  const { cartItems } = useContext(ShopContext);
  const { isSignedIn } = useUser();

  const getTotalCartCount = () =>
    Object.values(cartItems).reduce((acc, qty) => acc + qty, 0);

  const active = getActive();

  const navLinks = [
    { label: 'Shop', to: '/', key: 'shop' },
    { label: 'Men', to: '/mens', key: 'mens' },
    { label: 'Women', to: '/womens', key: 'womens' },
    { label: 'Kids', to: '/kids', key: 'kids' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Home-Mart Logo" className="h-10 w-auto" />
            <span className="text-2xl font-bold text-gray-900 tracking-tight">Home-Mart</span>
          </Link>

          {/* Desktop Nav Links */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map(({ label, to, key }) => (
              <li key={key}>
                <Link
                  to={to}
                  className={`relative text-base font-medium transition-colors duration-200 pb-1 ${
                    active === key
                      ? 'text-red-500 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-red-500 after:rounded'
                      : 'text-gray-600 hover:text-red-500'
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* Cart — always first */}
            <Link to="/cart" className="relative">
              <img src={cart_icon} alt="Cart" className="h-7 w-7" />
              {getTotalCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {getTotalCartCount()}
                </span>
              )}
            </Link>

            {/* Account — after cart */}
            {isSignedIn ? (
              <>
                <Link to="/orders" className="hidden md:flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-red-500 transition-colors">
                  Orders
                </Link>
                <UserButton afterSignOutUrl="/" />
              </>
            ) : (
              <Link to="/login" className="hidden md:block">
                <button className="px-5 py-2 border border-gray-400 rounded-full text-gray-600 text-sm font-medium hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-200">
                  Login
                </button>
              </Link>
            )}

            {/* Hamburger */}
            <button
              className="md:hidden text-gray-700 focus:outline-none"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pb-4 shadow-lg">
          <ul className="flex flex-col gap-3 pt-3">
            {navLinks.map(({ label, to, key }) => (
              <li key={key}>
                <Link
                  to={to}
                  onClick={() => setMenuOpen(false)}
                  className={`block text-base font-medium py-1 ${active === key ? 'text-red-500' : 'text-gray-600'}`}
                >
                  {label}
                </Link>
              </li>
            ))}
            <li>
              {isSignedIn ? (
                <div className="flex flex-col gap-2 py-1">
                  <Link to="/orders" onClick={() => setMenuOpen(false)} className="block text-base font-medium text-gray-600 py-1">My Orders</Link>
                  <UserButton afterSignOutUrl="/" />
                </div>
              ) : (
                <Link to="/login" onClick={() => setMenuOpen(false)} className="block text-base font-medium text-gray-600 py-1">
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
