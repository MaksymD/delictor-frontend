import { getPageContent } from "@/lib/content";

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const { data, content } = await getPageContent("terms", locale);

    return (
        <section className="text-center py-20 bg-gray-100 text-gray-800">
            <h1 className="text-4xl font-bold mb-4">{data.title || "Terms of Service"}</h1>
            <div className="prose prose-lg mx-auto px-8" dangerouslySetInnerHTML={{ __html: content }} />
                    </section>
    );
}
