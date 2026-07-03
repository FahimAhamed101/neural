import { siteConfig } from "@/lib/site-config";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-white px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-paper-dim sm:flex-row">
        <p>
          Copyright {new Date().getFullYear()} {siteConfig.name}. All rights
          reserved.
        </p>
        <p>{siteConfig.url.replace("https://", "")}</p>
      </div>
    </footer>
  );
}
