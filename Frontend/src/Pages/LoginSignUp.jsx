import { SignIn, SignUp } from '@clerk/clerk-react';
import { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';

const LoginSignUp = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { isSignedIn, isLoaded } = useUser();

  // Already logged in → go home
  if (isLoaded && isSignedIn) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-50 via-white to-purple-50 px-4 py-12">
      {/* Toggle tabs */}
      <div className="flex bg-white rounded-full shadow-sm border border-gray-100 p-1 mb-6">
        <button
          onClick={() => setIsLogin(true)}
          className={`px-8 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
            isLogin ? 'bg-red-500 text-white shadow-md' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Sign In
        </button>
        <button
          onClick={() => setIsLogin(false)}
          className={`px-8 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
            !isLogin ? 'bg-red-500 text-white shadow-md' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Sign Up
        </button>
      </div>

      {/* Clerk component */}
      {isLogin ? (
        <SignIn
          routing="hash"
          afterSignInUrl="/"
          appearance={{
            elements: {
              rootBox: 'w-full max-w-md',
              card: 'rounded-3xl shadow-xl border border-gray-100',
              headerTitle: 'text-2xl font-bold text-gray-900',
              headerSubtitle: 'text-gray-500 text-sm',
              formButtonPrimary: 'bg-red-500 hover:bg-red-600 text-white rounded-xl py-3 font-semibold transition-all',
              formFieldInput: 'rounded-xl border-gray-200 bg-gray-50 focus:ring-red-400 text-sm',
              footerActionLink: 'text-red-500 hover:underline font-semibold',
              socialButtonsBlockButton: 'rounded-xl border border-gray-200 hover:bg-gray-50 transition-all',
            },
          }}
        />
      ) : (
        <SignUp
          routing="hash"
          afterSignUpUrl="/"
          appearance={{
            elements: {
              rootBox: 'w-full max-w-md',
              card: 'rounded-3xl shadow-xl border border-gray-100',
              headerTitle: 'text-2xl font-bold text-gray-900',
              headerSubtitle: 'text-gray-500 text-sm',
              formButtonPrimary: 'bg-red-500 hover:bg-red-600 text-white rounded-xl py-3 font-semibold transition-all',
              formFieldInput: 'rounded-xl border-gray-200 bg-gray-50 focus:ring-red-400 text-sm',
              footerActionLink: 'text-red-500 hover:underline font-semibold',
              socialButtonsBlockButton: 'rounded-xl border border-gray-200 hover:bg-gray-50 transition-all',
            },
          }}
        />
      )}
    </div>
  );
};

export default LoginSignUp;
