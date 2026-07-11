import "@/styles/globals.css";
import ClientLayout from "@/components/ClientLayout";
import {locales} from "@/lib/i18n";
import {getMessages} from 'next-intl/server';
import {Fraunces, Manrope} from "next/font/google";

const fraunces = Fraunces({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    style: ["normal", "italic"],
    variable: "--font-fraunces",
    display: "swap",
});

const manrope = Manrope({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800"],
    variable: "--font-manrope",
    display: "swap",
});

export default async function RootLayout({
                                             children,
                                             params,
                                         }: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const {locale} = await params;

    const messages = await getMessages();

    // Safety check
    if (!locales.includes(locale)) {
        return <div>404 - Locale not supported</div>;
    }

    return (
        <html lang={locale} className={`${fraunces.variable} ${manrope.variable}`}>
        <head>
            <link rel="icon" href="/favicon.ico"/>
            <title>Kollektiv XX — Kasachische Küche in Wien</title>
        </head>
        <body>
        <ClientLayout messages={messages} locale={locale}>
            {children}
        </ClientLayout>
        </body>
        </html>
    );
}