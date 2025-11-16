import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import productsData from "@/data/products.json";
import { notFound } from "next/navigation";

export default async function ProductCategoryPage({ 
  params 
}: { 
  params: Promise<{ id: string; locale: string }> 
}) {
  const { id, locale } = await params;
  const t = await getTranslations({ locale, namespace: 'common.products' });
  const category = productsData.categories.find((cat) => cat.id === id);

  if (!category) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white py-14 md:py-20">
      <div className="mx-auto max-w-[80%] px-6">
        <div className="mb-6 md:mb-8">
          <div className="flex items-center gap-2 text-sm text-[#64748b]">
            <Link href="/products" className="inline-flex items-center gap-2 text-[#0ea5ff] hover:text-[#0596ea]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              {t('back')}
            </Link>
            <span>/</span>
            <span>Products</span>
            <span>/</span>
            <span className="text-[#0a2540] font-medium">{category.name}</span>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-white shadow-lg bg-gradient-to-br from-[#f0f9ff] via-white to-[#f0f9ff]">
          <div className="absolute inset-0 opacity-20 pointer-events-none" style={{backgroundImage:"radial-gradient(#93c5fd 1px, transparent 1px)",backgroundSize:"16px 16px"}} />
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 p-6 md:p-10">
            <div className="order-2 md:order-1">
              <div className="relative h-64 md:h-[340px] rounded-2xl overflow-hidden shadow-xl">
                <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
            </div>

            <div className="order-1 md:order-2 flex flex-col justify-center">
              <h1 className="text-3xl md:text-5xl font-bold font-heading text-[#0a2540] tracking-tight">
                {category.name}
              </h1>
              <p className="mt-4 text-base md:text-lg text-[#334155] leading-relaxed max-w-prose">
                {category.description}
              </p>

              <div className="mt-5 -mx-2 overflow-x-auto scrollbar-hide">
                <div className="px-2 inline-flex gap-2">
                  {category.items.map((item, index) => (
                    <span
                      key={index}
                      className="whitespace-nowrap px-3 py-1.5 text-xs md:text-sm rounded-full bg-[#0ea5ff]/10 text-[#0ea5ff] border border-[#0ea5ff]/20"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="mt-12 md:mt-16">
          <div className="flex items-end justify-between mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl font-bold font-heading text-[#0a2540]">
              {t('productsIn')} {category.name}
            </h2>
            <Link
              href="/contact"
              className="hidden md:inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-[#0ea5ff] text-white text-sm font-semibold shadow-md hover:shadow-lg transition-all"
            >
              {t('enquireNow')}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {category.products.map((product, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl border border-[#0a2540]/5 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <span className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-[#0ea5ff] to-[#0596ea]" />
                <div className="p-6">
                  <h3 className="text-lg md:text-xl font-semibold font-heading text-[#0a2540] mb-2 group-hover:text-[#0ea5ff] transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-[#334155] leading-relaxed">
                    {product.description}
                  </p>
                  <div className="mt-4 inline-flex items-center gap-2 text-[#0ea5ff] text-sm font-medium">
                    {t('explore')}
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="md:hidden mt-8">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center w-full h-12 rounded-xl bg-gradient-to-r from-[#0ea5ff] to-[#0596ea] text-white font-semibold shadow-md hover:shadow-lg transition-all"
            >
              {t('enquireNow')}
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

