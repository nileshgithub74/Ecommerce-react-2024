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

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Shop />} />
        <Route path='/mens' element={<ShopCategory banner={men_banner} category="men" />} />
        <Route path='/womens' element={<ShopCategory banner={womens_banner} category="women" />} />
        <Route path='/kids' element={<ShopCategory banner={kids_banner} category="kid" />} />
        <Route path="/product" element={<Product/>}>
          <Route path=':productId' element={<Product/>}/>
        
        </Route>
        
        <Route path='/cart' element={<Cart/>} />
        <Route path='/login' element={<LoginSignUp />} />
      </Routes>
      <Footer />

    
    </BrowserRouter>
  );
};

export default App;
