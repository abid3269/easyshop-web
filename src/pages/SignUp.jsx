import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Loader2 } from 'lucide-react';

const SignUp = () => {
  const [error, setError] = useState('');
  const { signUp } = useAuth();

  useEffect(() => {
    const triggerSignUp = async () => {
      try {
        await signUp();
      } catch (err) {
        console.error('Failed to initiate sign up:', err);
        setError('Failed to connect to Auth0. Please try refreshing the page.');
      }
    };
    triggerSignUp();
  }, [signUp]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        {error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        ) : (
          <>
            <Loader2 className="mx-auto h-12 w-12 text-blue-600 animate-spin" />
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Redirecting to Auth0...
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Please wait while we connect you to our secure registration provider.
            </p>
            <button
              onClick={() => signUp()}
              className="mt-4 text-blue-600 hover:text-blue-500 font-medium"
            >
              Click here if you are not redirected automatically
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default SignUp;
