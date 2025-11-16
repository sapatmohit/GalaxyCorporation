import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';

export default function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  // Validate that the locale is supported
  if (params.locale && !routing.locales.includes(params.locale as (typeof routing.locales)[number])) {
    notFound();
  }

  return children;
}