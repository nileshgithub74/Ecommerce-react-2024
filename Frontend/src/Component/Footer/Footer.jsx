import footer_logo from '../../Assets/Frontend_Assets/logo_big.png';
import instagram_icon from '../../Assets/Frontend_Assets/instagram_icon.png';
import whatsaap_icon from '../../Assets/Frontend_Assets/whatsapp_icon.png';
import pintester_icon from '../../Assets/Frontend_Assets/pintester_icon.png';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
        <div className="flex flex-col sm:flex-row justify-between gap-10 mb-10">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <img src={footer_logo} alt="Home Mart" className="h-10 w-auto brightness-200" />
              <span className="text-xl font-bold text-white">Home Mart</span>
            </div>
            <p className="text-sm text-gray-400 max-w-xs">Your one-stop shop for the latest fashion trends for the whole family.</p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 uppercase text-sm tracking-wider">Company</h4>
            <ul className="flex flex-col gap-2 text-sm">
              {['Company', 'Products', 'Offices', 'About', 'Contact'].map((item) => (
                <li key={item}>
                  <Link to="/" className="hover:text-red-400 transition-colors duration-200">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white font-semibold mb-4 uppercase text-sm tracking-wider">Follow Us</h4>
            <div className="flex gap-4">
              {[instagram_icon, whatsaap_icon, pintester_icon].map((icon, i) => (
                <div key={i} className="w-10 h-10 bg-gray-700 hover:bg-red-500 rounded-full flex items-center justify-center cursor-pointer transition-colors duration-200">
                  <img src={icon} alt="social" className="w-5 h-5 object-contain" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
          Copyright &copy; 2024 Home Mart — All rights reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
