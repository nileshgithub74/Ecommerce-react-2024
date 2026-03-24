import { useState } from 'react';

const DescriptionBox = () => {
  const [activeTab, setActiveTab] = useState('description');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-8">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-gray-100">
          {['description', 'reviews'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-4 text-sm font-semibold capitalize transition-all duration-200 ${
                activeTab === tab
                  ? 'border-b-2 border-red-500 text-red-500'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab === 'reviews' ? 'Reviews (122)' : 'Description'}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 sm:p-10 text-gray-600 text-sm leading-relaxed flex flex-col gap-4">
          {activeTab === 'description' ? (
            <>
              <p>An eCommerce website is a platform that enables businesses and individuals to sell products or services online to customers. These websites provide a convenient, accessible way for consumers to browse, select, and purchase goods directly from their devices, often with a variety of payment and shipping options.</p>
              <p>An eCommerce website combines user-friendly design, efficient functionality, and secure technology to create a seamless online shopping experience, catering to the ever-growing demand for digital commerce in today&apos;s world.</p>
            </>
          ) : (
            <p className="text-gray-400 italic">No reviews yet. Be the first to review this product.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DescriptionBox;
