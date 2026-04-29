"use client";

import Link from "next/link";
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter, usePathname } from "next/navigation";
import { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import { useTranslations } from 'next-intl';

export default function Navbar() {
    const router = useRouter();
    const pathname = usePathname();
    const t = useTranslations();

    // Detect locale safely
    const segments = pathname.split("/");
    const currentLocale = segments[1] === "de" ? "de" : "en";

    // Drawer state
    const [drawerOpen, setDrawerOpen] = useState(false);

    // Toggle drawer
    const toggleDrawer = () => setDrawerOpen(!drawerOpen);

    // Handle menu click
    const handleMenuClick = (href: string) => {
        router.push(href);
        setDrawerOpen(false);
    };

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
        <nav className="sticky top-0 z-50 flex justify-between items-center p-6 bg-white shadow text-gray-800">
            <div className="text-2xl font-bold drop-shadow-sm">
                KOLLEKTIV XX
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-6 text-lg items-center drop-shadow-sm">
                <Link href={`/${currentLocale}`}>{t('home')}</Link>
                <Link href={`/${currentLocale}/about`}>{t('about')}</Link>
                <Link href={`/${currentLocale}/menu`}>{t('menu')}</Link>
                <Link href={`/${currentLocale}/contact`}>{t('contact')}</Link>

                {/* Language Switch */}
                <div className="flex items-center gap-2 ml-6">
                    <Button
                        variant={currentLocale === "en" ? "contained" : "outlined"}
                        color={currentLocale === "en" ? "primary" : "inherit"}
                        onClick={() => switchLocale("en")}
                        sx={{textTransform: "none"}}
                    >
                        EN
                    </Button>
                    <Button
                        variant={currentLocale === "de" ? "contained" : "outlined"}
                        color={currentLocale === "de" ? "primary" : "inherit"}
                        onClick={() => switchLocale("de")}
                        sx={{textTransform: "none"}}
                    >
                        DE
                    </Button>
                </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
                <IconButton onClick={toggleDrawer} color="inherit">
                    <MenuIcon />
                </IconButton>
            </div>

            {/* Mobile Drawer */}
            <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <List sx={{ width: 250 }}>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => handleMenuClick(`/${currentLocale}`)}>
                            <ListItemText primary={t('home')} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => handleMenuClick(`/${currentLocale}/about`)}>
                            <ListItemText primary={t('about')} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => handleMenuClick(`/${currentLocale}/menu`)}>
                            <ListItemText primary={t('menu')} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => handleMenuClick(`/${currentLocale}/contact`)}>
                            <ListItemText primary={t('contact')} />
                        </ListItemButton>
                    </ListItem>
                    {/* Language Switch in Drawer */}
                    <ListItem disablePadding sx={{ mt: 2 }}>
                        <div className="flex items-center gap-2 ml-4">
                            <Button
                                variant={currentLocale === "en" ? "contained" : "outlined"}
                                color={currentLocale === "en" ? "primary" : "inherit"}
                                onClick={() => switchLocale("en")}
                                sx={{textTransform: "none"}}
                            >
                                EN
                            </Button>
                            <Button
                                variant={currentLocale === "de" ? "contained" : "outlined"}
                                color={currentLocale === "de" ? "primary" : "inherit"}
                                onClick={() => switchLocale("de")}
                                sx={{textTransform: "none"}}
                            >
                                DE
                            </Button>
                        </div>
                    </ListItem>
                </List>
            </Drawer>
        </nav>
    );
}