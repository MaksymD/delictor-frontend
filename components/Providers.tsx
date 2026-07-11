"use client";

import {useEffect, useState} from "react";
import {NextIntlClientProvider} from "next-intl";
import {ThemeProvider, createTheme} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme({
    palette: {
        primary: {
            main: "#C1552C", // Terracotta — brand accent
            dark: "#8F3E1F",
        },
    },
});

type Messages = Record<string, string>;

export default function Providers({
                                      children,
                                      locale,
                                  }: {
    children: React.ReactNode;
    locale: string;
}) {
    const [messages, setMessages] = useState<Messages | null>(null);

    useEffect(() => {
        fetch(`/locales/${locale}/common.json`)
            .then((res) => res.json())
            .then((data: Messages) => setMessages(data));
    }, [locale]);

    if (!messages) return <div>Loading...</div>;

    return (
        <NextIntlClientProvider messages={messages} locale={locale}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                {children}
            </ThemeProvider>
        </NextIntlClientProvider>
    );
}