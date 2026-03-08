interface PDFViewerProps {
    src: string;
    height?: string;
}

export default function PDFViewer({ src, height = "900px" }: PDFViewerProps) {
    return <iframe src={src} className="w-full" style={{ height }} title="Menu PDF" />;
}