import hand_icon from '../../Assets/Frontend_Assets/hand_icon.png';
import arrow_icon from '../../Assets/Frontend_Assets/arrow.png';
import hero_image from '../../Assets/Frontend_Assets/hero_image.png';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-rose-50 via-orange-50 to-amber-50">

      {/* Decorative blobs */}
      <div className="absolute top-[-80px] left-[-80px] w-96 h-96 bg-red-200 rounded-full opacity-30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-60px] right-[-60px] w-80 h-80 bg-orange-200 rounded-full opacity-30 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-100 rounded-full opacity-20 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 flex flex-col lg:flex-row items-center justify-between min-h-screen gap-12 py-20">

        {/* ── Left content ── */}
        <div className="flex-1 flex flex-col gap-6 z-10">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm border border-red-100 rounded-full px-4 py-2 w-fit shadow-sm">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-xs font-semibold text-red-600 uppercase tracking-widest">New Season {new Date().getFullYear()}</span>
          </div>

          {/* Headline */}
          <div className="flex flex-col gap-1 leading-none">
            <div className="flex items-center gap-4">
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black text-gray-900 tracking-tight">New</h1>
              <img src={hand_icon} alt="" className="w-14 sm:w-16 lg:w-20 -rotate-12 drop-shadow-md" />
            </div>
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">Collections</span>
            </h1>
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black text-gray-900 tracking-tight">For Everyone</h1>
          </div>

          {/* Subtext */}
          <p className="text-gray-500 text-base sm:text-lg max-w-sm leading-relaxed">
            Discover the latest trends in fashion — curated styles for men, women &amp; kids.
          </p>

          {/* Stats row */}
          <div className="flex items-center gap-8 py-2">
            {[['200+', 'Products'], ['50K+', 'Customers'], ['4.9★', 'Rating']].map(([val, label]) => (
              <div key={label} className="flex flex-col">
                <span className="text-xl font-bold text-gray-900">{val}</span>
                <span className="text-xs text-gray-400 font-medium">{label}</span>
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="flex flex-wrap items-center gap-4 mt-2">
            <Link to="/womens">
              <button className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-red-500 to-orange-400 hover:from-red-600 hover:to-orange-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-base group">
                Shop Now
                <img src={arrow_icon} alt="" className="w-4 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </Link>
            <Link to="/mens">
              <button className="px-8 py-4 bg-white/80 backdrop-blur-sm border border-gray-200 hover:border-red-300 text-gray-700 hover:text-red-500 font-semibold rounded-full shadow-sm hover:shadow-md transition-all duration-300 text-base">
                Explore Men
              </button>
            </Link>
          </div>
        </div>

        {/* ── Right image ── */}
        <div className="flex-1 flex items-center justify-center relative z-10">
          {/* Card background */}
          <div className="relative w-full max-w-sm lg:max-w-md">
            {/* Floating card */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-orange-300 rounded-[3rem] rotate-6 opacity-20 blur-sm" />
            <div className="relative bg-white/60 backdrop-blur-md rounded-[3rem] border border-white/80 shadow-2xl overflow-hidden p-4">
              <img
                src={hero_image}
                alt="Latest Collection"
                className="w-full object-contain drop-shadow-xl"
                style={{ maxHeight: '480px' }}
              />
            </div>

            {/* Floating badge — top right */}
            <div className="absolute -top-4 -right-4 bg-red-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg rotate-12">
              NEW IN
            </div>

            {/* Floating badge — bottom left */}
            <div className="absolute -bottom-4 -left-4 bg-white shadow-xl rounded-2xl px-4 py-3 flex items-center gap-3 border border-gray-100">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-sm font-bold">✓</div>
              <div>
                <p className="text-xs font-bold text-gray-800">Free Shipping</p>
                <p className="text-xs text-gray-400">On all orders</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 60L60 50C120 40 240 20 360 15C480 10 600 20 720 25C840 30 960 30 1080 25C1200 20 1320 10 1380 5L1440 0V60H0Z" fill="white" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
