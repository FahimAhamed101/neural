import Link from "next/link";
import { getWhatsAppLink, siteConfig } from "@/lib/site-config";
import { WhatsAppGlyph } from "./WhatsAppFloatingButton";

const navItems = [
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Stack", href: "#stack" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-line/80 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link href="#top" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-paper text-sm font-bold text-white">
            N
          </span>
          <span className="font-display text-lg font-bold tracking-tight text-paper">
            {siteConfig.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-semibold text-paper-dim transition-colors hover:text-signal"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href={getWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-md bg-success px-4 py-2 text-sm font-semibold text-white shadow-sm transition-transform hover:scale-[1.03]"
        >
          <WhatsAppGlyph className="h-4 w-4" />
          WhatsApp
        </a>
      </div>
    </header>
  );
}
