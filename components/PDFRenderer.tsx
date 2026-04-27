"use client";

import {Document, Page, pdfjs} from "react-pdf";
import {useState, useEffect} from "react";

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

interface PDFRendererProps {
    src: string;
}

export default function PDFRenderer({src}: PDFRendererProps) {
    // Calculate responsive width
    const getResponsiveWidth = () => {
        if (typeof window !== 'undefined') {
            const viewport = window.visualViewport;
            const screenWidth = viewport ? viewport.width : window.innerWidth;
            // On mobile, use screen width minus padding, on desktop use fixed width
            return screenWidth < 768 ? screenWidth - 40 : 800; // 40px for padding
        }
        return 800;
    };

    const [numPages, setNumPages] = useState<number>(0);
    const [pageWidth, setPageWidth] = useState<number>(() => getResponsiveWidth());

    function onDocumentLoadSuccess({numPages}: { numPages: number }) {
        setNumPages(numPages);
    }

    // Update width on mount and resize
    useEffect(() => {
        const handleResize = () => {
            setPageWidth(getResponsiveWidth());
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="flex flex-col items-center h-full bg-white px-5">
            <Document
                file={src}
                onLoadSuccess={onDocumentLoadSuccess}
                className="flex flex-col items-center space-y-4"
            >
                {Array.from({length: numPages}, (_, index) => (
                    <Page
                        key={`page_${index + 1}`}
                        pageNumber={index + 1}
                        width={pageWidth}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                        className="shadow-lg max-w-full"
                    />
                ))}
            </Document>
        </div>
    );
}