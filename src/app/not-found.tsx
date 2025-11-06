import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-9xl font-bold text-[#0a2540] mb-4">404</h1>
        <h2 className="text-3xl font-bold text-[#0a2540] mb-6">Page Not Found</h2>
        <p className="text-lg text-[#334155] mb-8">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        <Link 
          href="/"
          className="inline-flex items-center justify-center h-12 px-6 rounded-lg bg-gradient-to-r from-[#0ea5ff] to-[#0596ea] text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}