export default function Footer() {
    return (
        <footer className="text-center p-6 bg-gray-100 mt-10">
            &copy; {new Date().getFullYear()} Delictor. All rights reserved.
        </footer>
    );
}