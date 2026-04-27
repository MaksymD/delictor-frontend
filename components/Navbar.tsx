"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
    const router = useRouter();
    const pathname = usePathname();

    // Detect locale safely
    const segments = pathname.split("/");
    const currentLocale = segments[1] === "de" ? "de" : "en";

    // Switch language while keeping current page
    const switchLocale = (locale: string) => {
        const segments = pathname.split("/");

        // Remove existing locale if present
        if (segments[1] === "en" || segments[1] === "de") {
            segments.splice(1, 1);
        }

        const newPath = `/${locale}${segments.join("/")}`;
        router.push(newPath);
    };

    return (
        <nav className="flex justify-between items-center p-6 bg-white shadow text-gray-800">
            <div className="text-2xl font-bold drop-shadow-sm">
                KOLLEKTIV
            </div>

            <div className="flex gap-6 text-lg items-center drop-shadow-sm">
                <Link href={`/${currentLocale}`}>Home</Link>
                <Link href={`/${currentLocale}/about`}>About</Link>
                <Link href={`/${currentLocale}/menu`}>Menu</Link>
                <Link href={`/${currentLocale}/contact`}>Contact</Link>

                {/* Language Switch */}
                <div className="flex items-center gap-2 ml-6">
                    <button
                        onClick={() => switchLocale("en")}
                        className={`px-3 py-1 rounded transition-colors duration-200 ${
                            currentLocale === "en"
                                ? "bg-black text-white"
                                : "bg-white text-gray-800 hover:bg-gray-200"
                        }`}
                    >
                        EN
                    </button>

                    <button
                        onClick={() => switchLocale("de")}
                        className={`px-3 py-1 rounded transition-colors duration-200 ${
                            currentLocale === "de"
                                ? "bg-black text-white"
                                : "bg-white text-gray-800 hover:bg-gray-200"
                        }`}
                    >
                        DE
                    </button>
                </div>
            </div>
        </nav>
    );
}