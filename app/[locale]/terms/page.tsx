import { getPageContent } from "@/lib/content";

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const { data, content } = await getPageContent("terms", locale);

    return (
        <section className="text-center py-20 bg-sand text-ink min-h-screen">
            <h1 className="font-display text-4xl font-semibold mb-6">{data.title || "Terms of Service"}</h1>
            <div className="content-copy max-w-2xl mx-auto px-8 text-left" dangerouslySetInnerHTML={{ __html: content }} />
        </section>
    );
}
