'use client';
import React, { useRef, useState } from "react";

export default function UploadForm() {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [locale, setLocale] = useState<"de" | "en">("de");
    const [status, setStatus] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const file = inputRef.current?.files?.[0];
        if (!file) {
            setStatus("No file selected.");
            return;
        }
        if (file.type !== "application/pdf") {
            setStatus("Only PDF files are allowed.");
            return;
        }

        const form = new FormData();
        form.append("file", file);
        form.append("locale", locale);

        setStatus("Uploading...");
        try {
            const res = await fetch("/api/admin/upload-menu", {
                method: "POST",
                body: form,
            });
            if (res.ok) {
                setStatus(`Upload successful. The file is now live as menu_${locale}.pdf.`);
            } else {
                const text = await res.text();
                setStatus("Upload failed: " + text);
            }
        } catch {
            setStatus("Upload error.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 font-sans">
            <div className="flex gap-6">
                <label className="flex items-center gap-2 text-ink-dark cursor-pointer">
                    <input type="radio" name="locale" value="de" checked={locale === "de"}
                           onChange={() => setLocale("de")}/>
                    Deutsch (menu_de.pdf)
                </label>
                <label className="flex items-center gap-2 text-ink-dark cursor-pointer">
                    <input type="radio" name="locale" value="en" checked={locale === "en"}
                           onChange={() => setLocale("en")}/>
                    English (menu_en.pdf)
                </label>
            </div>

            <input
                ref={inputRef}
                type="file"
                accept="application/pdf"
                className="block text-ink-dark file:mr-4 file:px-4 file:py-2 file:rounded-full file:border-0 file:bg-terracotta file:text-card file:font-sans file:font-semibold file:cursor-pointer hover:file:bg-terracotta-dark file:transition-colors"
            />

            <p className="text-ink-dark/60 text-sm">
                Will be saved as: <strong>menu_{locale}.pdf</strong>
            </p>

            <button type="submit"
                    className="px-4 py-2 bg-terracotta text-card rounded-full font-sans font-semibold hover:bg-terracotta-dark transition-colors">
                Upload
            </button>

            {status && <p className="text-ink-dark/70 text-sm">{status}</p>}
        </form>
    );
}