import { SignUp } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            🚀 InnoTech Solutions
          </h1>
          <p className="text-gray-600">
            Creá tu cuenta y accedé a agentes especializados
          </p>
        </div>

        {/* Clerk Sign Up Component */}
        <SignUp 
          appearance={{
            elements: {
              formButtonPrimary: 'bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors',
              card: 'shadow-xl border border-gray-200 rounded-2xl',
              headerTitle: 'text-2xl font-bold text-gray-800 mb-2',
              headerSubtitle: 'text-gray-600 mb-6',
              socialButtonsBlockButton: 'border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors',
              formFieldInput: 'border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
              footerActionLink: 'text-blue-600 hover:text-blue-700 font-medium'
            }
          }}
          routing="path"
          path="/sign-up"
          redirectUrl="/"
          signInUrl="/sign-in"
        />

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            ¿Ya tenés cuenta?{' '}
            <a href="/sign-in" className="text-blue-600 hover:text-blue-700 font-medium">
              Iniciá sesión
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}