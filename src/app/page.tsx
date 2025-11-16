import { redirect } from 'next/navigation';
import { routing } from '@/i18n/routing';

// This page will be caught by middleware and redirected,
// but having it here ensures proper handling
export default function RootPage() {
  redirect(`/${routing.defaultLocale}`);
}

