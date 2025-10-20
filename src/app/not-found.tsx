import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-[#f8f9fa] px-6">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-[120px] md:text-[180px] font-heading font-bold text-[#0ea5ff] leading-none">
            404
          </h1>
          <div className="h-1 w-32 bg-[#0ea5ff] mx-auto rounded-full" />
        </div>
        
        <h2 className="text-[32px] md:text-[42px] font-heading font-bold text-[#0a2540] mb-4">
          Page Not Found
        </h2>
        <p className="text-[16px] text-[#6b7280] mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center h-12 px-8 rounded-lg bg-[#0ea5ff] text-white text-[15px] font-semibold shadow-sm hover:bg-[#0596ea] hover:shadow-md transition-all"
          >
            Go to Homepage
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center justify-center h-12 px-8 rounded-lg border border-[#0a2540]/25 text-[#0a2540] text-[15px] font-semibold hover:bg-[#0a2540]/5 transition-all"
          >
            View Products
          </Link>
        </div>
      </div>
    </main>
  );
}
