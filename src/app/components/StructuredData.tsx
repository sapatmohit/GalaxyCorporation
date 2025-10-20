export default function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Galaxy Corporation",
    "alternateName": "Galaxy Corporation - Global Agro Exporters",
    "url": "https://galaxycorporation.co.in",
    "logo": {
      "@type": "ImageObject",
      "url": "https://galaxycorporation.co.in/images/logo.png",
      "width": "200",
      "height": "200"
    },
    "description": "Leading exporter of premium agro commodities from India",
    "foundingDate": "2008",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Business Hub",
      "addressLocality": "Pune",
      "addressRegion": "Maharashtra",
      "postalCode": "411001",
      "addressCountry": "IN"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+91-20-1234-5678",
        "contactType": "customer service",
        "email": "info@galaxycorp.com",
        "availableLanguage": ["English", "Hindi"]
      },
      {
        "@type": "ContactPoint",
        "telephone": "+91-98765-43210",
        "contactType": "sales",
        "email": "sales@galaxycorp.com",
        "availableLanguage": ["English", "Hindi"]
      }
    ],
    "sameAs": [
      "https://facebook.com/galaxycorp",
      "https://twitter.com/galaxycorp",
      "https://linkedin.com/company/galaxycorp",
      "https://instagram.com/galaxycorp"
    ],
    "areaServed": {
      "@type": "Place",
      "name": "Worldwide"
    }
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Galaxy Corporation",
    "image": "https://galaxycorporation.co.in/images/logo.png",
    "@id": "https://galaxycorporation.co.in",
    "url": "https://galaxycorporation.co.in",
    "telephone": "+91-20-1234-5678",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Business Hub",
      "addressLocality": "Pune",
      "addressRegion": "Maharashtra",
      "postalCode": "411001",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 18.5196,
      "longitude": 73.8567
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "09:00",
        "closes": "13:00"
      }
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://galaxycorporation.co.in/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Products",
        "item": "https://galaxycorporation.co.in/products"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
