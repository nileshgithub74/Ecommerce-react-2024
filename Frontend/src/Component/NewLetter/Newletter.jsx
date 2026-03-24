import { useState } from 'react';

const Newletter = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-r from-pink-50 via-white to-purple-50">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Get Exclusive Offers on Your Email</h2>
        <p className="text-gray-500 mb-8">Subscribe to our newsletter and stay updated with the latest deals</p>

        {subscribed ? (
          <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl px-6 py-4 font-medium">
            Thanks for subscribing! Check your inbox soon.
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 px-5 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-400 text-sm shadow-sm"
            />
            <button
              type="submit"
              className="px-7 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-full transition-all duration-300 shadow-md hover:shadow-lg text-sm whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default Newletter;
