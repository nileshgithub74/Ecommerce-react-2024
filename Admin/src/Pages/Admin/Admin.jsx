import AddProduct from '../../component/AddProduct/AddProduct';
import ListProduct from '../../component/ListProduct/ListProduct';
import Sidebar from '../../component/Sidebar/Sidebar';
import './Admin.css';
import { Routes, Route } from 'react-router-dom';

const Admin = () => {
  return (
    <>
      <div className="admin">
        <Sidebar />
       
          <Routes>
            <Route path='/addproduct' element={<AddProduct />} />
            <Route path='/listproduct' element={<ListProduct />} />
          </Routes>
      
      </div>
    </>
  );
};

export default Admin;
