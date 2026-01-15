import { useAuth } from '../context/AuthContext';

const SocialSignIn = () => {
  const { signInWithGoogle, signInWithApple } = useAuth();

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

      <div className="mt-6 grid grid-cols-2 gap-3">
        <div>
          <button
            type="button"
            onClick={signInWithGoogle}
            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
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
            onClick={signInWithApple}
            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            <span className="sr-only">Sign in with Apple</span>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 11.066C10.662 11.066 9.538 9.878 9.538 8.411c0-1.467 1.124-2.655 2.462-2.655 1.338 0 2.462 1.188 2.462 2.655 0 1.467-1.124 2.655-2.462 2.655m5.56-4.665c-1.745 0-3.228 1.05-3.953 2.536-1.124-.03-2.248.33-3.138.93-.89-.6-2.014-.96-3.138-.93-1.437.03-2.814.78-3.663 2.044-1.214 1.745-1.552 4.14-1.124 6.442.6 1.835 1.775 3.53 3.377 4.545.89.57 1.924.96 3.013.99h.12c1.088-.03 2.122-.42 3.013-.99 1.602-1.015 2.777-2.71 3.377-4.545.428-2.302.09-4.697-1.124-6.442a3.868 3.868 0 00-3.108-1.924" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SocialSignIn;
