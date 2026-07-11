"use client";

import { Document, Page, pdfjs } from "react-pdf";
import { useState } from "react";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

export default function PDFRenderer({ src }: { src: string }) {
    const [numPages, setNumPages] = useState(0);
    const [scale, setScale] = useState(1);

    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);
    }

    return (
        <div className="flex flex-col items-center bg-card w-full pb-16">
            {/* Zoom controls */}
            <div className="flex items-center gap-4 my-6 font-sans">
                <button
                    onClick={() => setScale((s) => Math.max(0.5, s - 0.2))}
                    aria-label="Zoom out"
                    className="w-9 h-9 rounded-full border border-[var(--color-ochre)]/40 text-ink hover:border-terracotta hover:text-terracotta transition-colors cursor-pointer"
                >
                    −
                </button>
                <span className="text-ink-soft text-sm w-12 text-center">{Math.round(scale * 100)}%</span>
                <button
                    onClick={() => setScale((s) => Math.min(3, s + 0.2))}
                    aria-label="Zoom in"
                    className="w-9 h-9 rounded-full border border-[var(--color-ochre)]/40 text-ink hover:border-terracotta hover:text-terracotta transition-colors cursor-pointer"
                >
                    +
                </button>
            </div>

            {/* Scroll container */}
            <div className="w-full overflow-auto flex justify-center">
                <Document file={src} onLoadSuccess={onDocumentLoadSuccess}>
                    {Array.from({ length: numPages }, (_, index) => (
                        <div key={index} className="flex justify-center mb-4">
                            <Page
                                pageNumber={index + 1}
                                scale={scale}
                                renderTextLayer={false}
                                renderAnnotationLayer={false}
                            />
                        </div>
                    ))}
                </Document>
            </div>
        </div>
    );
}