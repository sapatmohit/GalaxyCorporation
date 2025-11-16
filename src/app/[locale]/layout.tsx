import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Geist, Geist_Mono } from 'next/font/google';
import { notFound } from 'next/navigation';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import '../globals.css';
import { SpeedInsights } from "@vercel/speed-insights/next"

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const t = (await import(`@/messages/${locale}.json`)).default;

	const alternates: Record<string, string> = {};
	routing.locales.forEach((loc) => {
		alternates[loc] = `/${loc}`;
	});

	return {
		title: t.metaTitle,
		description: t.metaDescription,
		alternates: {
			languages: alternates,
		},
	};
}

export default async function LocaleLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;

	// Ensure that the incoming `locale` is valid
	if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
		notFound();
	}

	// Providing all messages to the client
	// side is the easiest way to get started
	const messages = await getMessages( { locale } );

	return (
		<html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
			<head>
				{routing.locales.map((loc) => (
					<link key={loc} rel="alternate" hrefLang={loc} href={`/${loc}`} />
				))}
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white min-h-screen flex flex-col w-full max-w-full overflow-x-hidden`}
			>
				<NextIntlClientProvider locale={locale} messages={messages}>
					<Navbar />
					<main className="flex-grow pt-0 mx-auto w-[90%] max-w-screen-xl">
						{children}
					</main>
					<Footer />
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
