"use client";

import Link from "next/link";
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function Footer() {
    const pathname = usePathname();
    const currentLocale = pathname.startsWith('/de') ? 'de' : 'en';
    const t = useTranslations();

    return (
        <footer className="flex justify-between items-center p-6 bg-white shadow text-gray-800 drop-shadow-sm">
            <div className="text-sm text-gray-500">© 2026 KOLLEKTIV. <span className="text-xs">All rights reserved.</span></div>
    <div className="flex gap-4 text-md">
    <Link href={`/${currentLocale}/privacy`} className="hover:underline">{t('privacy')}</Link>
                <Link href={`/${currentLocale}/terms`} className="hover:underline">{t('terms')}</Link>
            </div>
        </footer>
    );
}