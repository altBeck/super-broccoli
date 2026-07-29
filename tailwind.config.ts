import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        surface: "var(--surface)",
        foreground: "var(--foreground)",
        muted: "var(--muted)",
        border: "var(--border)",
        accent: "var(--accent)",
        "banner-bg": "var(--banner-bg)",
        "banner-fg": "var(--banner-fg)",
        "footer-bg": "var(--footer-bg)",
        "footer-fg": "var(--footer-fg)",
      },
      fontFamily: {
        sans: ["Raveo Variable", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
        display: ["Raveo Variable", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 24px 80px rgb(10 19 12 / 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
