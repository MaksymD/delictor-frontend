import { getMarkdownContent } from "@/lib/fetchContent";

export default function HomePage() {
    const { data, content } = getMarkdownContent("home.md");

    return (
        <section className="text-center py-20">
            <h1 className="text-4xl font-bold mb-4">{data.title}</h1>
            <h2 className="text-2xl mb-6">{data.subtitle}</h2>
            <p className="text-lg">{content}</p>
        </section>
    );
}