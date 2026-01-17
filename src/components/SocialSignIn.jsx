import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const SocialSignIn = () => {
  const { signInWithGoogle, signInWithApple, signInWithGithub, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSocialSignIn = async (method) => {
    try {
      await method();
    } catch (error) {
      console.error("Social sign in error:", error);
    }
  };

  return (
    <div className="mt-6">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or continue with</span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3">
        <div>
          <button
            type="button"
            disabled={isLoading}
            onClick={() => handleSocialSignIn(signInWithGoogle)}
            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
          >
            <span className="sr-only">Sign in with Google</span>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12.24 10.285V14.4h6.806c-.806 3.228-3.784 5.428-6.806 5.428-4.017 0-7.267-3.25-7.267-7.267s3.25-7.267 7.267-7.267c2.27 0 3.82.91 4.695 1.745l2.4-2.4C17.65 2.52 15.2 1.2 12.24 1.2 6.43 1.2 1.745 5.9 1.745 11.7s4.685 10.5 10.495 10.5c6.2 0 10.04-4.333 10.04-10.214 0-.685-.06-1.385-.17-2.071H12.24z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        <div>
          <button
            type="button"
            disabled={isLoading}
            onClick={() => handleSocialSignIn(signInWithApple)}
            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
          >
            <span className="sr-only">Sign in with Apple</span>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M17.05 20.28c-.96.95-2.06 1.72-3.4 1.72-1.34 0-1.76-.83-3.32-.83-1.56 0-2.05.81-3.33.81-1.28 0-2.34-.72-3.32-1.72C1.68 18.26 1 15.28 1 12.28c0-3 1.92-4.57 3.84-4.57 1.28 0 2.25.79 3.2.79.95 0 1.6-.79 3.04-.79 1.44 0 2.5.61 3.36 1.44-.48.48-1.44 1.44-1.44 3.12 0 1.92 1.44 2.88 1.44 3-.01.12-.32 1.08-1.39 2.02zM12.03 7.3c-.03-2.16 1.71-3.84 3.48-3.84.03 2.16-1.71 3.84-3.48 3.84z" />
            </svg>
          </button>
        </div>

        <div>
          <button
            type="button"
            disabled={isLoading}
            onClick={() => handleSocialSignIn(signInWithGithub)}
            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
          >
            <span className="sr-only">Sign in with GitHub</span>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.008.069-.008 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SocialSignIn;
