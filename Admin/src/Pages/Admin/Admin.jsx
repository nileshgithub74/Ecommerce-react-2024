import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from '../../component/Sidebar/Sidebar';
import Dashboard from '../../component/Dashboard/Dashboard';
import AddProduct from '../../component/AddProduct/AddProduct';
import ListProduct from '../../component/ListProduct/ListProduct';
import OrderItems from '../../component/OrderItems/OrderItems';
import Users from '../../component/Users/Users';

const Admin = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/listproduct" element={<ListProduct />} />
          <Route path="/orders" element={<OrderItems />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </main>
    </div>
  );
};

export default Admin;

