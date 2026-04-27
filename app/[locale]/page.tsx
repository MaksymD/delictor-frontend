import { getPageContent } from "@/lib/content";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const { data, content } = await getPageContent("home", locale);

    return (
        <section className="text-center py-20 bg-gray-100 text-gray-800">
            <h1 className="text-4xl font-bold mb-4">{data.title}</h1>
            <h2 className="text-2xl mb-6">{data.subtitle}</h2>
            <p className="text-lg">{content}</p>
        </section>
    );
}