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
        <nav className="sticky top-0 z-50 flex justify-between items-center px-6 py-4 bg-card/95 backdrop-blur border-b border-[var(--color-ochre)]/30">
            <button
                onClick={() => goToSection("home")}
                className="font-display text-xl md:text-2xl font-semibold text-ink tracking-wide cursor-pointer"
            >
                Kollektiv <span className="text-terracotta">XX</span>
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
                                : "text-ink-soft hover:text-ink"
                        }`}
                    >
                        EN
                    </button>
                    <span className="text-ink-soft/50">/</span>
                    <button
                        onClick={() => switchLocale("de")}
                        aria-current={currentLocale === "de"}
                        className={`px-2 py-1 rounded-full transition-colors cursor-pointer ${
                            currentLocale === "de"
                                ? "bg-terracotta text-card font-semibold"
                                : "text-ink-soft hover:text-ink"
                        }`}
                    >
                        DE
                    </button>
                </div>

                {/* Hamburger — holds navigation on every screen size */}
                <IconButton onClick={toggleDrawer} aria-label="menu" sx={{ color: "var(--color-ink)" }}>
                    <MenuIcon />
                </IconButton>
            </div>

            <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <div className="w-[260px] h-full bg-card flex flex-col">
                    <div className="flex justify-end p-2">
                        <IconButton onClick={() => setDrawerOpen(false)} aria-label="close">
                            <CloseIcon sx={{ color: "var(--color-ink)" }} />
                        </IconButton>
                    </div>
                    <List sx={{ px: 1 }}>
                        {SECTIONS.map((section) => (
                            <ListItem key={section} disablePadding>
                                <ListItemButton
                                    onClick={() => goToSection(section)}
                                    sx={{ py: 1.5 }}
                                >
                                    <ListItemText
                                        primary={t(section)}
                                        slotProps={{
                                            primary: {
                                                sx: {
                                                    fontFamily: "var(--font-display)",
                                                    fontSize: "1.15rem",
                                                    color: "var(--color-ink)",
                                                },
                                            },
                                        }}
                                    />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </div>
            </Drawer>
        </nav>
    );
}
