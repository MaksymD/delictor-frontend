import "@/styles/globals.css";
import ClientLayout from "@/components/ClientLayout";
import Footer from "@/components/Footer";
import {locales} from "@/lib/i18n";
import {getMessages} from 'next-intl/server';

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
        <html lang={locale}>
        <head>
            <link rel="icon" href="/favicon.ico"/>
            <title>KOLLEKTIV XX</title>
        </head>
        <body>
        <ClientLayout messages={messages} locale={locale}>
            <main>{children}</main>
            <Footer/>
        </ClientLayout>
        </body>
        </html>
    );
}