
import Navbar from "./Component/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from "./Pages/Cart";
import LoginSignUp from "./Pages/LoginSignUp";
import Footer from "./Component/Footer/Footer";
import men_banner from './Assets/Frontend_Assets/banner_mens.png';
import womens_banner from './Assets/Frontend_Assets/banner_women.png';
import kids_banner from './Assets/Frontend_Assets/banner_kids.png';
import CheckoutForm from "./Component/CheckoutFrom/CheckoutFrom";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';


// Initialize Stripe
const stripePromise = loadStripe("pk_test_51QNVRfK0MnJ6utZufu9hEQ1aN5I3XYT9Y3PSscdbpDcYiJIu5Z1lFq04mdz5mEl2rEemjRV5rwA1a1bzThM8XQhW00ytJSjzy3"); // Replace with your actual public key

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Main Shop Route */}
        <Route path='/' element={<Shop />} />

        {/* Category Routes */}
        <Route path='/mens' element={<ShopCategory banner={men_banner} category="men" />} />
        <Route path='/womens' element={<ShopCategory banner={womens_banner} category="women" />} />
        <Route path='/kids' element={<ShopCategory banner={kids_banner} category="kid" />} />

        {/* Dynamic Product Route */}
        <Route path='/product/:productId' element={<Product />} />
        
        {/* Cart Route */}
        <Route path='/cart' element={<Cart />} />

        {/* Login/Signup Route */}
        <Route path='/login' element={<LoginSignUp />} />

        {/* Checkout Route wrapped in Elements provider for Stripe */}
        <Route 
          path='/checkout' 
          element={
            <Elements stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          } 
        />

   

      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
