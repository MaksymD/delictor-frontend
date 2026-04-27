import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { locales } from "@/lib/i18n";

export default async function RootLayout({
                                             children,
                                             params,
                                         }: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    // Safety check
    if (!locales.includes(locale)) {
        return <div>404 - Locale not supported</div>;
    }

    return (
        <html lang={locale}>
        <head>
            <link rel="icon" href="/favicon.ico" />
            <title>KOLLEKTIV</title>
        </head>
        <body className="font-sans">
        <Navbar />
        <main>{children}</main>
        <Footer />
        </body>
        </html>
    );
}