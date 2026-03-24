import logo from '../../assets/logo.png';

const Navbar = () => {
  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center gap-2">
        <img src={logo} alt="Logo" className="h-8 w-auto" />
        <span className="text-sm font-semibold text-gray-700 hidden sm:block">Admin Panel</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
          <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <span className="text-sm font-medium text-gray-700 hidden sm:block">Admin</span>
      </div>
    </header>
  );
};

export default Navbar;
