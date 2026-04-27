import { getPageContent } from "@/lib/content";
import PDFViewer from "@/components/PDFViewer";

export default async function MenuPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const { data, content } = await getPageContent("menu", locale);

    return (
        <section className="text-center py-20 bg-gray-100 text-gray-800">
            <h1 className="text-4xl font-bold mb-4">{data.title || "Menu"}</h1>
            <div className="prose prose-lg mx-auto px-8" dangerouslySetInnerHTML={{ __html: content }} />
            <div className="max-w-5xl mx-auto px-4 mt-8">
                <PDFViewer src="/menu.pdf" />
            </div>
        </section>
    );
}
