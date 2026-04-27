"use client";

import PDFRenderer from "./PDFRenderer";

interface MenuPDFProps {
  locale: string;
}

export default function MenuPDF({ locale }: MenuPDFProps) {
  return <PDFRenderer src={`/menu_${locale}.pdf`} />;
}
