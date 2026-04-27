"use client";

import {useEffect, useState} from "react";
import {NextIntlClientProvider} from "next-intl";
import {ThemeProvider, createTheme} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme({
    palette: {
        primary: {
            main: "#000000", // Black for active buttons
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