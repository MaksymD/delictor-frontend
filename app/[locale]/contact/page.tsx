import {getPageContent} from "@/lib/content";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';

export default async function ContactPage({params}: { params: Promise<{ locale: string }> }) {
    const {locale} = await params;
    const {data} = await getPageContent("contact", locale);

    return (
        <section className="bg-gray-100 min-h-screen py-20 text-gray-800">
            <div className="max-w-xl mx-auto px-8 space-y-6">
                <h1 className="text-3xl font-bold text-center">{data.title}</h1>

                <div className="text-center space-y-2 text-lg">
                    <p>
                        <strong>{data.emailLabel}:</strong>{" "}
                        <a href={`E-Mail:${data.email}`} className="text-blue-600 hover:underline">
                            {data.email}
                        </a>
                    </p>
                    <p>
                        <strong>{data.addressLabel}:</strong> {data.address}
                    </p>
                    <p>
                        <strong>{data.hoursLabel}:</strong> {data.hours}
                    </p>
                </div>

                <div className="rounded-lg overflow-hidden shadow">
                    <iframe
                        title="Google Map"
                        src="https://www.google.com/maps?q=48.232730,16.371913&z=17&output=embed"
                        width="100%"
                        height="250"
                        style={{border: 0}}
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
                        className="flex items-center justify-center px-4 py-2 rounded-lg bg-white-100 hover:bg-pink-200 transition"
                    >
                        <InstagramIcon className="text-pink-600"/><span>Instagram</span>
                    </a>

                    <a
                        href="https://facebook.com/yourprofile"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center px-4 py-2 rounded-lg bg-white-100 hover:bg-blue-200 transition"
                    >
                        <FacebookIcon className="text-blue-700"/><span>Facebook</span>
                    </a>
                </div>
            </div>
        </section>
    );
}