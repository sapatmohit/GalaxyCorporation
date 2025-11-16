'use client';

import { localeNames, locales } from '@/i18n/config';
import { usePathname, useRouter } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import { useEffect, useState } from 'react';

export default function LanguageSwitcher() {
	const locale = useLocale();
	const router = useRouter();
	// next-intl's usePathname already returns pathname without locale prefix
	const pathname = usePathname();
	const [mounted, setMounted] = useState(false);
	const [hasRedirected, setHasRedirected] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	useEffect(() => {
		if (mounted && !hasRedirected) {
			const savedLocale = localStorage.getItem('preferred-locale');
			if (
				savedLocale &&
				savedLocale !== locale &&
				locales.includes(savedLocale as (typeof locales)[number])
			) {
				setHasRedirected(true);
				// Use window.location to get current path and strip locale manually
				const currentPath = window.location.pathname;
				let cleanPath = '/';

				// Remove locale prefix from current path
				for (const loc of locales) {
					if (currentPath.startsWith(`/${loc}/`)) {
						cleanPath = currentPath.replace(`/${loc}`, '');
						break;
					}
					if (currentPath === `/${loc}`) {
						cleanPath = '/';
						break;
					}
				}

				// Only redirect if we have a valid clean path
				if (cleanPath) {
					router.replace(cleanPath, {
						locale: savedLocale as (typeof locales)[number],
					});
				}
			}
		}
	}, [mounted, hasRedirected, locale, router]);

	const handleLanguageChange = (newLocale: string) => {
		if (newLocale === locale) return;

		localStorage.setItem('preferred-locale', newLocale);

		// next-intl's usePathname should return pathname without locale prefix
		// But add safety check to ensure no locale prefix exists
		let cleanPath = pathname || '/';

		// Safety: Remove any locale prefix if it somehow exists
		for (const loc of locales) {
			if (cleanPath.startsWith(`/${loc}/`) || cleanPath === `/${loc}`) {
				cleanPath = cleanPath.replace(`/${loc}`, '') || '/';
				break;
			}
		}

		router.replace(cleanPath, {
			locale: newLocale as (typeof locales)[number],
		});
	};

	if (!mounted) {
		return null;
	}

	return (
		<div className="relative">
			<select
				value={locale}
				onChange={(e) => handleLanguageChange(e.target.value)}
				className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-[#0a2540] cursor-pointer hover:border-[#0ea5ff] transition-colors focus:outline-none focus:ring-2 focus:ring-[#0ea5ff]"
				aria-label="Select language"
			>
				{locales.map((loc) => (
					<option key={loc} value={loc}>
						{localeNames[loc]}
					</option>
				))}
			</select>
			<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
				<svg
					className="fill-current h-4 w-4"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
				>
					<path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
				</svg>
			</div>
		</div>
	);
}
