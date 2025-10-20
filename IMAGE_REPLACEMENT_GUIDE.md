# Image Replacement Guide for Galaxy Corporation Website

This guide explains how to replace placeholder images with your actual company images.

## Directory Structure

Create the following directory structure in `/public/images/`:

```
public/
└── images/
    ├── logo.png                 # Company logo
    ├── hero/
    │   ├── slide-1.jpg         # Hero carousel image 1
    │   ├── slide-2.jpg         # Hero carousel image 2
    │   └── slide-3.jpg         # Hero carousel image 3
    ├── products/
    │   ├── pulses-legumes.jpg
    │   ├── oil-seeds.jpg
    │   ├── spices.jpg
    │   ├── cereals.jpg
    │   ├── fresh-vegetables.jpg
    │   └── dry-fruits-nuts.jpg
    ├── team/
    │   ├── member-1.jpg        # Team member photos
    │   ├── member-2.jpg
    │   ├── member-3.jpg
    │   ├── member-4.jpg
    │   ├── member-5.jpg
    │   └── member-6.jpg
    └── logos/
        ├── apeada.png         # Membership logos
        ├── spices-board.png
        ├── mccia.png
        ├── msamb.png
        └── indo-arab.png
```

## Image Specifications

### Logo
- **File**: `/public/images/logo.png`
- **Recommended size**: 200x60px
- **Format**: PNG with transparent background
- **Usage**: Navbar logo

### Hero Carousel Images
- **Files**: `/public/images/hero/slide-*.jpg`
- **Recommended size**: 1200x800px
- **Format**: JPG
- **Aspect ratio**: 3:2
- **Usage**: Homepage hero carousel

### Product Category Images
- **Files**: `/public/images/products/*.jpg`
- **Recommended size**: 800x600px
- **Format**: JPG
- **Aspect ratio**: 4:3
- **Usage**: Product category cards

### Team Member Photos
- **Files**: `/public/images/team/member-*.jpg`
- **Recommended size**: 400x500px
- **Format**: JPG
- **Aspect ratio**: 4:5 (portrait)
- **Usage**: Team member cards

### Membership Logos
- **Files**: `/public/images/logos/*.png`
- **Recommended size**: 200x200px
- **Format**: PNG with transparent background
- **Usage**: Memberships & Affiliations section

## How to Replace Images

### Option 1: Replace URLs in Code

1. Open `/src/app/lib/images.ts`
2. Replace Unsplash URLs with your local image paths:

```typescript
export const HERO_IMAGES = [
  "/images/hero/slide-1.jpg",
  "/images/hero/slide-2.jpg",
  "/images/hero/slide-3.jpg",
];

export const PRODUCT_IMAGES = {
  "pulses-legumes": "/images/products/pulses-legumes.jpg",
  "oil-seeds": "/images/products/oil-seeds.jpg",
  // ... etc
};
```

### Option 2: Directly Update Components

Search for Unsplash URLs in these files and replace them:

- `src/app/components/PremiumHero.tsx` - Hero images
- `src/app/components/ProductsSection.tsx` - Product images
- `src/app/components/TeamSection.tsx` - Team photos
- `src/app/components/MembershipsSection.tsx` - Organization logos

### Logo Replacement

In `/src/app/components/PremiumNavbar.tsx`, replace the gradient box with your logo:

```tsx
// Replace this:
<div className="relative w-10 h-10 rounded-lg bg-gradient-to-br from-[#0ea5ff] to-[#0596ea] flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
  <span className="text-white font-bold text-[18px]">G</span>
</div>

// With this:
<img
  src="/images/logo.png"
  alt="Galaxy Corporation"
  className="h-10 w-auto"
/>
```

## Image Optimization Tips

1. **Compress images** before uploading (use tools like TinyPNG, ImageOptim)
2. **Use WebP format** for better performance when possible
3. **Provide retina versions** (@2x) for high-DPI displays
4. **Use Next.js Image component** for automatic optimization:

```tsx
import Image from 'next/image';

<Image
  src="/images/hero/slide-1.jpg"
  alt="Description"
  width={1200}
  height={800}
  priority
/>
```

## Current Placeholder Sources

All current images are from Unsplash.com and are used as placeholders only. Replace them with your actual company images before deployment.

## Contact Details to Update

Don't forget to also update:
- Company address in `ContactSection.tsx`
- Email addresses (info@galaxycorp.com, sales@galaxycorp.com)
- Phone numbers
- Google Maps embed URL
- Social media links (when added)
