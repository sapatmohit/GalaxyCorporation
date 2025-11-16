import { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

const baseUrl = 'https://galaxycorporation.co.in';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: '', priority: 1, changeFrequency: 'yearly' as const },
    { path: '/products', priority: 0.7, changeFrequency: 'weekly' as const },
    { path: '/about', priority: 0.5, changeFrequency: 'yearly' as const },
    { path: '/contact', priority: 0.5, changeFrequency: 'yearly' as const },
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  routes.forEach((route) => {
    routing.locales.forEach((locale) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${route.path}`,
        lastModified: new Date(),
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((loc) => [
              loc,
              `${baseUrl}/${loc}${route.path}`,
            ])
          ),
        },
      });
    });
  });

  return sitemapEntries;
}