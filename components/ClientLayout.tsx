"use client";

import dynamic from 'next/dynamic';
import { Messages } from 'next-intl';

const Providers = dynamic(() => import('@/components/Providers'), { ssr: false });
const Navbar = dynamic(() => import('@/components/Navbar'), { ssr: false });

export default function ClientLayout({ children, locale }: { children: React.ReactNode; messages: Messages; locale: string }) {
    return (
        <Providers locale={locale}>
            <Navbar />
            <main>{children}</main>
            {/* Footer can stay server-rendered if no hydration issues */}
        </Providers>
    );
}
