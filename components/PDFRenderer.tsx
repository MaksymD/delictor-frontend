"use client";

import {Document, Page, pdfjs} from "react-pdf";
import {useState, useCallback, useLayoutEffect} from "react";

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

interface PDFRendererProps {
    src: string;
}

export default function PDFRenderer({src}: PDFRendererProps) {
    const [numPages, setNumPages] = useState<number>(0);
    const [containerWidth, setContainerWidth] = useState<number>(() => {
        if (typeof window !== 'undefined') {
            return Math.min(window.innerWidth - 40, 800);
        }
        return 800;
    });

    const updateWidth = useCallback(() => {
        const width = window.innerWidth;
        setContainerWidth(Math.min(width - 40, 800));
    }, []);

    useLayoutEffect(() => {
        window.addEventListener("resize", updateWidth);
        return () => window.removeEventListener("resize", updateWidth);
    }, [updateWidth]);

    function onDocumentLoadSuccess({numPages}: { numPages: number }) {
        setNumPages(numPages);
    }

    return (
        <div className="flex flex-col items-center w-full bg-white px-5 py-4">
            <Document
                file={src}
                onLoadSuccess={onDocumentLoadSuccess}
                className="flex flex-col items-center gap-4"
            >
                {Array.from({length: numPages}, (_, index) => (
                    <Page
                        key={`page_${index + 1}`}
                        pageNumber={index + 1}
                        width={containerWidth}
                        devicePixelRatio={typeof window !== 'undefined' ? window.devicePixelRatio : 1}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                        className="shadow-md"
                    />
                ))}
            </Document>
        </div>
    );
}