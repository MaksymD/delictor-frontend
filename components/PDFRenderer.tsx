"use client";

import {Document, Page, pdfjs} from "react-pdf";
import {useState} from "react";

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

interface PDFRendererProps {
    src: string;
}

export default function PDFRenderer({src}: PDFRendererProps) {
    const [numPages, setNumPages] = useState<number>(0);

    function onDocumentLoadSuccess({numPages}: { numPages: number }) {
        setNumPages(numPages);
    }

    return (
        <div className="flex flex-col items-center h-full bg-white">
            <Document
                file={src}
                onLoadSuccess={onDocumentLoadSuccess}
                className="flex flex-col items-center space-y-4"
            >
                {Array.from({length: numPages}, (_, index) => (
                    <Page
                        key={`page_${index + 1}`}
                        pageNumber={index + 1}
                        width={800}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                        className="shadow-lg"
                    />
                ))}
            </Document>
        </div>
    );
}