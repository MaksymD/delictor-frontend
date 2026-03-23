import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="flex justify-between items-center p-6 bg-white shadow text-gray-800">
            <div className="text-2xl font-bold drop-shadow-sm">Delictor</div>
            <div className="flex gap-6 text-lg drop-shadow-sm">
                <Link href="/">Home</Link>
                <Link href="/about">About</Link>
                <Link href="/menu">Menu</Link>
                <Link href="/contact">Contact</Link>
            </div>
        </nav>
    );
}