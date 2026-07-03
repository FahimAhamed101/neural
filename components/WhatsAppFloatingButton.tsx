import { getWhatsAppLink } from "@/lib/site-config";

export default function WhatsAppFloatingButton() {
  return (
    <a
      href={getWhatsAppLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Neural IT Limited on WhatsApp"
      className="group fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full bg-success px-4 py-4 text-white shadow-[0_10px_28px_rgba(18,140,74,0.34)] transition-transform hover:scale-105 sm:pr-5"
    >
      <span className="relative flex h-3 w-3">
        <span className="absolute inline-flex h-full w-full animate-pulseDot rounded-full" />
        <span className="relative inline-flex h-3 w-3 rounded-full bg-white" />
      </span>
      <WhatsAppGlyph className="h-6 w-6 shrink-0" />
      <span className="hidden text-sm font-semibold sm:inline">
        Chat on WhatsApp
      </span>
    </a>
  );
}

export function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M16.02 3C9.4 3 4 8.36 4 14.94c0 2.32.65 4.48 1.78 6.33L4 29l7.94-1.73a12.9 12.9 0 0 0 4.08.66h.01c6.62 0 12.02-5.36 12.02-11.94C28.05 8.36 22.65 3 16.02 3zm0 21.7h-.01a10.6 10.6 0 0 1-3.75-.68l-.27-.1-3.7.81.8-3.55-.17-.28a9.83 9.83 0 0 1-1.5-5.06c0-5.44 4.45-9.87 9.9-9.87 2.65 0 5.13 1.03 7 2.9a9.76 9.76 0 0 1 2.9 6.96c0 5.44-4.44 9.87-9.9 9.87zm5.42-7.4c-.3-.15-1.76-.86-2.03-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.24-.45-2.36-1.44a8.83 8.83 0 0 1-1.63-2.02c-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.6-.92-2.2-.24-.57-.49-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.5s1.07 2.9 1.22 3.1c.15.2 2.1 3.2 5.1 4.5.71.3 1.27.49 1.7.62.72.23 1.37.2 1.89.12.58-.09 1.76-.72 2-1.41.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35z" />
    </svg>
  );
}
