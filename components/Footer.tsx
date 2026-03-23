export default function Footer() {
    return (
        <footer className="flex justify-between items-center p-6 bg-white shadow text-gray-800 drop-shadow-sm">
            <div className="text-lg font-semibold">© 2026 Delictor. All rights reserved.</div>
            <div className="flex gap-4 text-md">
                <a href="/privacy" className="hover:underline">Privacy Policy</a>
                <a href="/terms" className="hover:underline">Terms of Service</a>
            </div>
        </footer>
    );
}