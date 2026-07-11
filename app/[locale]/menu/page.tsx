import { redirect } from "next/navigation";

export default async function MenuRedirect({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    redirect(`/${locale}#menu`);
}
