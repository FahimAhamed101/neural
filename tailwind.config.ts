import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#F7F8FA",
        "ink-raised": "#FFFFFF",
        paper: "#17211D",
        "paper-dim": "#5F6B66",
        line: "#DDE3E0",
        signal: "#2563EB",
        amber: "#B7791F",
        success: "#128C4A",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        blueprint:
          "linear-gradient(rgba(37,99,235,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(18,140,74,0.06) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "40px 40px",
      },
      keyframes: {
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        rise: {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseDot: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(18,140,74,0.35)" },
          "50%": { boxShadow: "0 0 0 6px rgba(18,140,74,0)" },
        },
      },
      animation: {
        blink: "blink 1s step-start infinite",
        rise: "rise 0.7s ease-out both",
        pulseDot: "pulseDot 2s ease-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
