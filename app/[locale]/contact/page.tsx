import { getPageContent } from "@/lib/content";

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const { data, content } = await getPageContent("contact", locale);

    return (
        <section className="bg-gray-100 min-h-screen py-20 text-gray-800">
            <div className="max-w-xl mx-auto px-8 space-y-6">
                <h1 className="text-3xl font-bold text-center">{data.title || "Contact Us"}</h1>

                <div className="text-center space-y-2 text-lg">
                    <p>
                        <strong>{data.phoneLabel || "Phone"}:</strong>{" "}
                        <a href={`tel:${data.phone || "+1 234 567 890"}`} className="text-blue-600 hover:underline">
                            {data.phone || "+1 234 567 890"}
                        </a>
                    </p>
                    <p>
                        <strong>{data.addressLabel || "Address"}:</strong> {data.address || "Vienna City Center, Austria"}
                    </p>
                </div>

                <div className="rounded-lg overflow-hidden shadow">
                    <iframe
                        title="Google Map"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2604.9999999999995!2d16.372504315956!3d48.2081741792286!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476d07fd6b1c6b1b%3A0x400fefcfa7b4a60!2sVienna%2C%20Austria!5e0!3m2!1sen!2sat!4v1710000000000"
                        width="100%"
                        height="250"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>

                <div className="flex gap-6 mt-6 justify-center flex-wrap">
                    <a
                        href="https://instagram.com/yourprofile"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-pink-100 hover:bg-pink-200 transition"
                    >
                        <span className="font-medium text-pink-600">Instagram</span>
                    </a>

                    <a
                        href="https://facebook.com/yourprofile"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-100 hover:bg-blue-200 transition"
                    >
                        <span className="font-medium text-blue-700">Facebook</span>
                    </a>

                    <a
                        href="https://wa.me/1234567890"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-100 hover:bg-green-200 transition"
                    >
                        <span className="font-medium text-green-700">WhatsApp</span>
                    </a>
                </div>
            </div>
        </section>
    );
}