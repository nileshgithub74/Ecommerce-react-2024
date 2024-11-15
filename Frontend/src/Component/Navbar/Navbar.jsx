import './Navbar.css';
import logo from '../../Assets/Frontend_Assets/logo.png';
import cart_icon from '../../Assets/Frontend_Assets/cart_icon.png';
import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';  

const Navbar = () => {
  const [menu, setMenu] = useState("shop");


  const { cartItems } = useContext(ShopContext);

  const getTotalCartCount = () => {
    return Object.values(cartItems).reduce((acc, quantity) => acc + quantity, 0);
  };

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="Home-Mart Logo" />
        <p>Home-Mart</p>
      </div>

      <ul className="nav-menu">
        <li onClick={() => setMenu("shop")}>
          <Link to='/' style={{ textDecoration: 'none' }}>Shop</Link>
          {menu === "shop" ? <hr /> : null}
        </li>
        <li onClick={() => setMenu("mens")}>
          <Link to='/mens' style={{ textDecoration: 'none' }}>Men</Link>
          {menu === "mens" ? <hr /> : null}
        </li>
        <li onClick={() => setMenu("womens")}>
          <Link to='/womens' style={{ textDecoration: 'none' }}>Women</Link>
          {menu === "womens" ? <hr /> : null}
        </li>
        <li onClick={() => setMenu("kids")}>
          <Link to='/kids' style={{ textDecoration: 'none' }}>Kids</Link>
          {menu === "kids" ? <hr /> : null}
        </li>
       
      </ul>

      <div className="nav-login-cart">
        <Link to="/login">
          <button>Login</button>
        </Link>
        <div className="nav-cart">
          <Link to='/cart'>
            <img src={cart_icon} alt="Cart Icon" />
          </Link>
          <div className="nav-cart-count">
            {getTotalCartCount()} 
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
