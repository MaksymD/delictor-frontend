import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export async function getPageContent(page: string, locale: string) {
    const fileName = `${page}.${locale}.md`;
    const fullPath = path.join(process.cwd(), "content", fileName);
    try {
        const fileContents = await fs.readFile(fullPath, "utf8");
        const { data, content } = matter(fileContents);
        const processedContent = await remark().use(html).process(content);
        const contentHtml = processedContent.toString();
        return { data, content: contentHtml };
    } catch {
        throw new Error(`Failed to load page content: ${fileName}`);
    }
}