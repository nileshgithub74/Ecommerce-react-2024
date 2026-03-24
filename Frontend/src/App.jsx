import Navbar from "./Component/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from "./Pages/Cart";
import LoginSignUp from "./Pages/LoginSignUp";
import Orders from "./Pages/Orders";
import Footer from "./Component/Footer/Footer";
import men_banner from './Assets/Frontend_Assets/banner_mens.png';
import womens_banner from './Assets/Frontend_Assets/banner_women.png';
import kids_banner from './Assets/Frontend_Assets/banner_kids.png';
import CheckoutForm from "./Component/CheckoutFrom/CheckoutFrom";
import ProtectedRoute from "./Component/ProtectedRoute";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Public routes */}
        <Route path='/' element={<Shop />} />
        <Route path='/mens' element={<ShopCategory banner={men_banner} category="men" />} />
        <Route path='/womens' element={<ShopCategory banner={womens_banner} category="women" />} />
        <Route path='/kids' element={<ShopCategory banner={kids_banner} category="kid" />} />
        <Route path='/login' element={<LoginSignUp />} />

        {/* Protected routes — must be signed in */}
        <Route path='/product/:productId' element={
          <ProtectedRoute><Product /></ProtectedRoute>
        } />
        <Route path='/cart' element={
          <ProtectedRoute><Cart /></ProtectedRoute>
        } />
        <Route path='/checkout' element={
          <ProtectedRoute>
            <Elements stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          </ProtectedRoute>
        } />
        <Route path='/orders' element={
          <ProtectedRoute><Orders /></ProtectedRoute>
        } />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
