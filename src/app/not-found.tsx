import Link from "next/link";

export default function Custom404() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto mb-4  rounded-full flex items-center justify-center">
            <span className="text-7xl font-bold text-orange-500">404</span>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Lost your way?
        </h1>

        <p className="text-gray-600 mb-8 max-w-sm">
          Oops! The page you are looking for doesn&apos;t exist or has been moved.
        </p>

        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-orange-400 hover:bg-orange-500/95 transition-colors"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}
