import { routing } from '@/i18n/routing';

// This page will be caught by middleware and redirected,
// but having it here ensures proper handling
export default function RootPage() {
  // The middleware will handle the redirect to the default locale
  // This component will not actually be rendered
  return null;
}

export async function getStaticPaths() {
  return {
    paths: routing.locales.map((locale) => ({ params: { locale } })),
    fallback: false,
  };
}

