"use client";

import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useRouter, usePathname } from "next/navigation";
import { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import { useTranslations } from 'next-intl';
import Image from "next/image";

const SECTIONS = ["home", "about", "menu", "contact"] as const;

export default function Navbar() {
    const router = useRouter();
    const pathname = usePathname();
    const t = useTranslations();

    // Detect locale safely
    const segments = pathname.split("/");
    const currentLocale = segments[1] === "de" ? "de" : "en";
    const isHome = pathname === `/${currentLocale}` || pathname === `/${currentLocale}/`;

    // Drawer state
    const [drawerOpen, setDrawerOpen] = useState(false);
    const toggleDrawer = () => setDrawerOpen((open) => !open);

    // Go to a section: smooth-scroll if already on the one-page home,
    // otherwise navigate to the home page landing on the anchor.
    const goToSection = (section: string) => {
        setDrawerOpen(false);
        if (isHome) {
            document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
            router.push(`/${currentLocale}#${section}`, { scroll: false });
        } else {
            router.push(`/${currentLocale}#${section}`);
        }
    };

    // Switch language while keeping current page/anchor
    const switchLocale = (locale: string) => {
        const segs = pathname.split("/");
        if (segs[1] === "en" || segs[1] === "de") {
            segs.splice(1, 1);
        }
        const newPath = `/${locale}${segs.join("/")}`;
        router.push(newPath);
    };

    return (
        <nav className="sticky top-0 z-50 flex justify-between items-center px-6 py-4 bg-cream/95 backdrop-blur border-b border-[var(--color-ochre)]/30">
            <button
                onClick={() => goToSection("home")}
                className="flex items-center gap-3 cursor-pointer"
            >
                <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0">
                    <Image
                        src="/logo.jpg"
                        alt="Kollektiv XX"
                        fill
                        className="object-cover scale-150"
                        priority
                    />
                </div>
            </button>

            <div className="flex items-center gap-4">
                {/* Language switch — always visible, never hidden in the hamburger */}
                <div className="flex items-center gap-1 font-sans text-sm">
                    <button
                        onClick={() => switchLocale("en")}
                        aria-current={currentLocale === "en"}
                        className={`px-2 py-1 rounded-full transition-colors cursor-pointer ${
                            currentLocale === "en"
                                ? "bg-terracotta text-card font-semibold"
                                : "text-ink-dark/60 hover:text-ink-dark"
                        }`}
                    >
                        EN
                    </button>
                    <span className="text-ink-dark/40">/</span>
                    <button
                        onClick={() => switchLocale("de")}
                        aria-current={currentLocale === "de"}
                        className={`px-2 py-1 rounded-full transition-colors cursor-pointer ${
                            currentLocale === "de"
                                ? "bg-terracotta text-card font-semibold"
                                : "text-ink-dark/60 hover:text-ink-dark"
                        }`}
                    >
                        DE
                    </button>
                </div>
            </div>
        </nav>
    );
}
