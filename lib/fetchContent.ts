import fs from "fs";
import path from "path";
import matter from "gray-matter";

export function getMarkdownContent(file: string) {
    const fullPath = path.join(process.cwd(), "content", file);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    return matter(fileContents);
}