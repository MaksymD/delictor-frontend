'use client';
import React, { useRef, useState } from "react";

export default function UploadForm() {
    const inputRef = useRef<HTMLInputElement | null>(null);
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

        setStatus("Uploading...");
        try {
            const res = await fetch("/api/admin/upload-menu", {
                method: "POST",
                body: form,
            });
            if (res.ok) {
                setStatus("Upload successful. The file is available at `/menu_de.pdf`.");
            } else {
                const text = await res.text();
                setStatus("Upload failed: " + text);
            }
        } catch {
            setStatus("Upload error.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <input
                    ref={inputRef}
                    type="file"
                    accept=".pdf"
                    className="block"
                />
            </div>
            <div className="flex gap-2">
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                    Upload PDF
                </button>
                <a
                    href="/menu_de.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 border rounded"
                >
                    View current
                </a>
            </div>
            {status && <p className="text-sm">{status}</p>}
        </form>
    );
}
