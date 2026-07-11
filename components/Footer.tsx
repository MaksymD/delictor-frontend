"use client";

import Link from "next/link";
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function Footer() {
    const pathname = usePathname();
    const currentLocale = pathname.startsWith('/de') ? 'de' : 'en';
    const t = useTranslations();

    return (
        <footer className="border-t border-[var(--color-ochre)]/30 bg-card">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 px-6 py-6 text-ink-soft font-sans">
                <div className="text-sm text-center sm:text-left">
                    © 2026 Kollektiv XX. <span className="text-xs">All rights reserved.</span>
                </div>
                <div className="flex gap-5 text-sm">
                    <Link href={`/${currentLocale}/privacy`} className="hover:text-terracotta transition-colors">{t('privacy')}</Link>
                    <Link href={`/${currentLocale}/terms`} className="hover:text-terracotta transition-colors">{t('terms')}</Link>
                </div>
            </div>
        </footer>
    );
}
