import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="flex justify-between p-6 shadow bg-white">
            <div className="text-xl font-bold">Delictor</div>
            <div className="flex gap-6">
                <Link href="/">Home</Link>
                <Link href="/about">About</Link>
                <Link href="/menu">Menu</Link>
                <Link href="/contact">Contact</Link>
            </div>
        </nav>
    );
}