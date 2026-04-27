import { getPageContent } from "@/lib/content";
import MenuPDF from "@/components/MenuPDF";

export default async function MenuPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data: _data, content } = await getPageContent("menu", locale);

    return (
        <div className="bg-gray-100 text-gray-800 min-h-screen flex flex-col">
            <div className="text-center py-0.5">
                {/*<h1 className="text-4xl font-bold mb-4">{data.title}</h1>*/}
                <div className="prose prose-lg mx-auto px-8" dangerouslySetInnerHTML={{ __html: content }} />
            </div>
            <div className="flex-grow bg-white">
                <MenuPDF locale={locale} />
            </div>
        </div>
    );
}
