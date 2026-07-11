export const runtime = "nodejs";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get("file");
        const locale = formData.get("locale");

        if (!file || !(file instanceof File)) {
            return new Response("No file provided", { status: 400 });
        }
        if (file.type !== "application/pdf") {
            return new Response("Uploaded file is not a PDF", { status: 400 });
        }
        if (locale !== "de" && locale !== "en") {
            return new Response("Invalid or missing locale (expected 'de' or 'en')", { status: 400 });
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const fs = await import("fs/promises");
        const path = await import("path");

        const outPath = path.join(process.cwd(), "public", `menu_${locale}.pdf`);
        await fs.writeFile(outPath, buffer, { flag: "w" });

        return new Response(JSON.stringify({ success: true, file: `menu_${locale}.pdf` }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch {
        return new Response("Upload failed", { status: 500 });
    }
}