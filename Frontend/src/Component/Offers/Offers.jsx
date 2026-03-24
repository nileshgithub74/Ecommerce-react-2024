import exclusive from "../../Assets/Frontend_Assets/exclusive_image.png";
import { Link } from "react-router-dom";

const Offers = () => {
  return (
    <section className="mx-4 sm:mx-8 lg:mx-16 my-12 rounded-2xl bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-100 overflow-hidden shadow-sm">
      <div className="flex flex-col sm:flex-row items-center justify-between px-8 sm:px-16 py-12 gap-8">
        <div className="flex flex-col gap-4">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
            Exclusive<br />Offers For You
          </h2>
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest">Only on best sellers products</p>
          <Link to="/womens">
            <button className="mt-2 px-8 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-full transition-all duration-300 shadow-md hover:shadow-lg w-fit">
              Check Now
            </button>
          </Link>
        </div>
        <img src={exclusive} alt="Exclusive offer" className="w-48 sm:w-64 object-contain" />
      </div>
    </section>
  );
};

export default Offers;
