/**
 * OrnamentBand — the site's signature motif.
 *
 * A thin repeating band of linked diamonds with hook-like flourishes,
 * loosely evoking the scroll/horn motifs common in Central Asian textile
 * and felt-rug borders. Used sparingly as a rhythm device between the
 * page's sections instead of a plain <hr>.
 *
 * Implemented as a tiled CSS background (not a stretched SVG viewBox) so
 * the motif repeats at a fixed size and never distorts, regardless of
 * how wide the container is.
 */

const TONE_HEX: Record<string, string> = {
    ochre: "#BE8F3E",
    terracotta: "#C1552C",
    turquoise: "#2E7A72",
};

function tileDataUri(hex: string) {
    const color = hex.replace("#", "%23");
    const svg =
        `<svg xmlns='http://www.w3.org/2000/svg' width='40' height='24'>` +
        `<line x1='0' y1='12' x2='40' y2='12' stroke='${color}' stroke-width='1' opacity='0.45'/>` +
        `<g transform='translate(20,12)'>` +
        `<rect x='-5' y='-5' width='10' height='10' transform='rotate(45)' fill='none' stroke='${color}' stroke-width='1.3'/>` +
        `<path d='M -5 0 C -10 -5 -10 5 -15 0' fill='none' stroke='${color}' stroke-width='1.1' stroke-linecap='round'/>` +
        `<path d='M 5 0 C 10 -5 10 5 15 0' fill='none' stroke='${color}' stroke-width='1.1' stroke-linecap='round'/>` +
        `</g></svg>`;
    return `url("data:image/svg+xml,${svg}")`;
}

export default function OrnamentBand({
    tone = "ochre",
    className = "",
}: {
    tone?: "ochre" | "terracotta" | "turquoise";
    className?: string;
}) {
    const hex = TONE_HEX[tone] ?? TONE_HEX.ochre;

    return (
        <div
            role="presentation"
            aria-hidden="true"
            className={`w-full h-6 ${className}`}
            style={{
                backgroundImage: tileDataUri(hex),
                backgroundRepeat: "repeat-x",
                backgroundPosition: "center",
            }}
        />
    );
}
