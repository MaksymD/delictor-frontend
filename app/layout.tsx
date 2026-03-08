import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <head>
            <link rel="icon" href="/favicon.ico" />
            <title>Delictor</title>
        </head>
        <body className="font-sans">
        <Navbar />
        <main>{children}</main>
        <Footer />
        </body>
        </html>
    );
}