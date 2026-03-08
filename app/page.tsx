import fs from "fs";
import path from "path";
import matter from "gray-matter";

export default async function HomePage() {
    const fullPath = path.join(process.cwd(), "content/home.md");
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return (
        <section className="text-center py-20">
            <h1 className="text-4xl font-bold mb-4">{data.title}</h1>
            <h2 className="text-2xl mb-6">{data.subtitle}</h2>
            <p className="text-lg">{content}</p>
        </section>
    );
}