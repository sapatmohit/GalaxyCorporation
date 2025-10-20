import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://galaxycorporation.co.in'
  
  // Product categories
  const productCategories = [
    'pulses-legumes',
    'oil-seeds',
    'spices',
    'cereals',
    'fresh-vegetables',
    'dry-fruits-nuts',
  ]
  
  const productPages = productCategories.map((category) => ({
    url: `${baseUrl}/products/${category}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...productPages,
  ]
}
