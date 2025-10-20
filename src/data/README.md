# Website Data - JSON Files

All website content has been organized into JSON files for easy management and updates.

## Data Files Overview

### 1. `hero.json`
Hero carousel section data
- Carousel slide images
- Welcome message and descriptions
- CTA button text and link

### 2. `features.json`
"Why Choose Us" section data
- Section title and subtitle
- 4 feature cards (icon, title, description)
- Statistics bar (4 stats)

### 3. `products.json`
Product categories and detailed listings
- 6 product categories
- Each category includes:
  - Category info (id, name, image, description)
  - List of product items
  - Detailed product descriptions
- Covers: Pulses, Oil Seeds, Spices, Cereals, Vegetables, Dry Fruits

### 4. `team.json`
Team members section data
- Section title and subtitle
- 6 team members with:
  - Name, position, photo
  - Biography

### 5. `memberships.json`
Memberships & Affiliations data
- 5 organization memberships
- Each includes: name, full name, logo, description
- Trust badge text

### 6. `contact.json`
Contact section data
- Form title and subjects dropdown
- Contact information (address, email, phone, hours)
- Google Maps embed URL

### 7. `navigation.json`
Main navigation structure
- Logo configuration
- Main navigation links (5 items)
- CTA button

### 8. `siteConfig.json`
Global site configuration
- Company information
- SEO metadata
- Social media links
- Theme colors
- Contact details
- Footer configuration

## How to Use These Files

### Import in Components

```typescript
import heroData from '@/data/hero.json';
import featuresData from '@/data/features.json';
import productsData from '@/data/products.json';
import teamData from '@/data/team.json';
import membershipsData from '@/data/memberships.json';
import contactData from '@/data/contact.json';
import navData from '@/data/navigation.json';
import siteConfig from '@/data/siteConfig.json';
```

### Example Usage

```typescript
// In PremiumHero.tsx
import heroData from '@/data/hero.json';

export default function PremiumHero() {
  return (
    <section>
      <h2>{heroData.content.title} {heroData.content.highlight}</h2>
      {heroData.slides.map((slide) => (
        <img key={slide.id} src={slide.image} alt={slide.alt} />
      ))}
    </section>
  );
}
```

## Updating Content

To update any website content:

1. **Navigate to the appropriate JSON file** in `/src/data/`
2. **Edit the values** (text, images, links)
3. **Save the file** - changes will reflect automatically
4. **No code changes needed** - just update data

## Example: Changing Hero Content

Edit `hero.json`:
```json
{
  "content": {
    "title": "Your New Title",
    "highlight": "Your Company Name",
    "description1": "Your updated description..."
  }
}
```

## Example: Adding a Team Member

Edit `team.json`:
```json
{
  "members": [
    ...existing members,
    {
      "id": 7,
      "name": "New Member Name",
      "position": "Position Title",
      "image": "/images/team/member-7.jpg",
      "bio": "Biography text..."
    }
  ]
}
```

## Example: Adding a Product Category

Edit `products.json`:
```json
{
  "categories": [
    ...existing categories,
    {
      "id": "new-category",
      "name": "New Category Name",
      "image": "/images/products/new-category.jpg",
      "description": "Category description",
      "items": ["Item 1", "Item 2"],
      "products": [
        {
          "name": "Product Name",
          "description": "Product description"
        }
      ]
    }
  ]
}
```

## Benefits of JSON Data Structure

1. **Easy Content Updates** - Non-developers can edit content
2. **Centralized Data** - All content in one place
3. **Type Safety** - Can generate TypeScript types
4. **Version Control** - Easy to track content changes
5. **Reusability** - Same data can be used in multiple places
6. **API Ready** - Can easily convert to API endpoints

## File Structure

```
src/data/
├── README.md              # This file
├── hero.json             # Hero section
├── features.json         # Why Choose Us
├── products.json         # Products & categories
├── team.json            # Team members
├── memberships.json     # Memberships
├── contact.json         # Contact info
├── navigation.json      # Navigation links
└── siteConfig.json      # Site configuration
```

## Next Steps

To fully integrate these JSON files:

1. Update components to import and use JSON data
2. Create TypeScript interfaces for type safety
3. Add validation for JSON structure
4. Consider creating a CMS or admin panel for easier editing
5. Add environment-based configurations if needed

## Notes

- All image paths should point to `/public/images/`
- URLs should be updated to actual production URLs
- Email addresses and phone numbers are placeholders
- Social media links need to be configured
- Update copyright year in `siteConfig.json` as needed
