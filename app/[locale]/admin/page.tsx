import UploadForm from "@/components/UploadForm";

export default function AdminPage() {
    return (
        <section className="max-w-2xl mx-auto py-12">
            <h1 className="text-2xl font-bold mb-6">Upload menu (choose language below)</h1>
            <UploadForm/>
        </section>
    );
}