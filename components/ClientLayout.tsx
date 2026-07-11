"use client";

import dynamic from 'next/dynamic';
import { Messages } from 'next-intl';

const Providers = dynamic(() => import('@/components/Providers'), { ssr: false });
const Navbar = dynamic(() => import('@/components/Navbar'), { ssr: false });
const Footer = dynamic(() => import('@/components/Footer'), { ssr: false });

export default function ClientLayout({ children, locale }: { children: React.ReactNode; messages: Messages; locale: string }) {
    return (
        <Providers locale={locale}>
            <Navbar />
            <main>{children}</main>
            <Footer />
        </Providers>
    );
}
