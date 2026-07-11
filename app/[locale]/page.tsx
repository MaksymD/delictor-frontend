import { getPageContent } from "@/lib/content";
import MenuPDF from "@/components/MenuPDF";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;

    const [home, menu, contact] = await Promise.all([
        getPageContent("home", locale),
        getPageContent("menu", locale),
        getPageContent("contact", locale),
    ]);

    const ctaLabel = locale === "de" ? "Speisekarte ansehen" : "View the menu";

    return (
        <>
            {/* Home / Hero */}
            <section id="home" className="scroll-mt-24 bg-sand px-6 py-24 md:py-32 text-center">
                <h1 className="font-display text-5xl md:text-7xl font-semibold text-ink leading-[1.05] mb-8">{home.data.title}</h1>
                <a href="#menu" className="inline-block px-8 py-3 rounded-full bg-terracotta text-card font-sans font-semibold tracking-wide hover:bg-terracotta-dark transition-colors">{ctaLabel}</a>
            </section>

            {/* Menu */}
            <section id="menu" className="scroll-mt-24 bg-sand-deep">
                <div className="text-center px-6 pt-16 md:pt-20 pb-6">
                    {menu.data.subtitle && (
                        <p className="font-sans text-xs md:text-sm tracking-[0.3em] uppercase text-terracotta mb-4">{menu.data.subtitle}</p>
                    )}
                    <h2 className="font-display text-3xl md:text-4xl font-semibold text-ink mb-2">{menu.data.title}</h2>
                    {menu.content && (
                        <div className="content-copy max-w-xl mx-auto" dangerouslySetInnerHTML={{ __html: menu.content }} />
                    )}
                </div>
                <div className="bg-card">
                    <MenuPDF locale={locale} />
                </div>
            </section>

            {/* Contact */}
            <section id="contact" className="scroll-mt-24 bg-card px-6 py-20 md:py-28">
                <div className="max-w-xl mx-auto space-y-8">
                    <h2 className="font-display text-3xl md:text-4xl font-semibold text-ink text-center">{contact.data.title}</h2>

                    <div className="text-left space-y-2 font-sans text-ink-soft text-lg">
                        <p><strong className="text-ink">{contact.data.emailLabel}:</strong> <a href={`mailto:${contact.data.email}`} className="text-terracotta hover:underline">{contact.data.email}</a></p>
                        <p><strong className="text-ink">{contact.data.addressLabel}:</strong> {contact.data.address}</p>
                        <p><strong className="text-ink">{contact.data.hoursLabel}:</strong> {contact.data.hours}</p>
                    </div>

                    <div className="rounded-2xl overflow-hidden shadow-md border border-[var(--color-ochre)]/30">
                        <iframe title="Google Map" src="https://www.google.com/maps?q=48.232730,16.371913&z=17&output=embed" width="100%" height="280" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                    </div>

                    <div className="flex gap-4 justify-center flex-wrap">
                        <a href="https://instagram.com/kollektiv.vienna" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-[var(--color-ochre)]/40 text-ink-soft hover:border-terracotta hover:text-terracotta transition-colors"><InstagramIcon fontSize="small" /> Instagram</a>
                        <a href="https://facebook.com/kollektiv.vienna" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-[var(--color-ochre)]/40 text-ink-soft hover:border-terracotta hover:text-terracotta transition-colors"><FacebookIcon fontSize="small" /> Facebook</a>
                    </div>
                </div>
            </section>
        </>
    );
}