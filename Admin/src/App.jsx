import Navbar from './component/Navbar/Navbar';
import Admin from './Pages/Admin/Admin';

const App = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <Admin />
    </div>
  );
};

export default App;
